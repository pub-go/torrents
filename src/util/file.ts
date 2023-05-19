import type { UploadRawFile } from "element-plus"
import { sha1 } from './sha1'
import type { Req, Resp } from "./worker"

interface ProgressData {
    current: number,
    total: number,
    version: string,
    workerCount: number,
    buzyWorker: Set<number>,
    waitingTask: number,
}

// 进度回调。如果返回 false 则终止计算
type onProgress = (data: ProgressData) => boolean

// 算完后点击上一步再点击下一步 如果文件和分片大小没变 就复用 sha1 结果
const cache = new Map<string, Uint8Array>()

async function genFilesSha1(files: UploadRawFile[], readBlockSize: number, pieceSize: number, version: string, onProgress: onProgress) {
    const totalSize = files.reduce((sum, f) => sum + f.size, 0)

    // cache first
    const key = files.map(f => f.uid).join('|') + pieceSize
    const cached = cache.get(key)
    if (cached) {
        onProgress({
            current: totalSize,
            total: totalSize,
            version,
            workerCount: workers.length,
            buzyWorker: workingIndex,
            waitingTask: waitingTask.length,
        })
        return cached
    }

    // 对每个分片计算 sha1 值
    const hashArray: Uint8Array[] = await genPiecesSha1(files, readBlockSize, pieceSize, totalSize, version, onProgress)

    // 结果组合 将分片结果连起来返回
    const len = hashArray.reduce((sum, i) => sum + i.byteLength, 0)
    const result = new Uint8Array(len)
    let i = 0
    for (const h of hashArray) {
        result.set(h, i)
        i += h.byteLength
    }

    // 写回缓存
    cache.set(key, result)
    return result
}

// 等待队列
let waitingTask: { req: Req, callback: HashCallback }[] = [];

async function genPiecesSha1(files: UploadRawFile[], readBlockSize: number, pieceSize: number, totalSize: number,
    version: string, onProgress: onProgress) {
    const hashArray: Uint8Array[] = []
    let index = 0// 分片位置
    let readBytes = 0// 已读取字节数 用于更新进度
    let doneBytes = 0
    waitingTask = []// 清空等待任务
    await new Promise<void>(async (resolve, reject) => {
        for await (let piece of readBlock(files, totalSize, readBlockSize, pieceSize)) {
            if (piece) {
                readBytes += piece.byteLength
                if (!onProgress({
                    current: readBytes,
                    total: totalSize,
                    version,
                    workerCount: workers.length,
                    buzyWorker: workingIndex,
                    waitingTask: waitingTask.length,
                })) {
                    return reject(new Error('Canceled'))// 如果界面上重置了任务允许终端计算
                }
                await hash(version, index++, piece, (v, index, pieceLength, result) => {
                    if (version !== v) {
                        throw new Error('Canceled')// 等待队列中的老任务返回了应当丢弃
                    }
                    hashArray[index] = result // 分片结果保存
                    doneBytes += pieceLength // 已计算完成的字节数
                    if (doneBytes === totalSize) { resolve() }
                })// await 返回才继续读取下一分片
            }
        }
    })// 等待所有分片计算完成
    onProgress({
        current: readBytes,
        total: totalSize,
        version,
        workerCount: workers.length,
        buzyWorker: workingIndex,
        waitingTask: waitingTask.length,
    })
    return hashArray
}

function readBlock(files: UploadRawFile[], totalSize: number, readBlockSize: number, pieceSize: number) {
    if (readBlockSize < pieceSize) {
        readBlockSize = pieceSize
    }

    const fileCount = files.length
    let fileIndex = 0 // 要读取的文件
    let start = 0     // 下次读取的位置

    const read = async () => {
        let block = await files[fileIndex].slice(start, start + readBlockSize).arrayBuffer()// 读取当前文件
        let len = block.byteLength  // 读出的大小
        start += len                // 下次读取的位置

        while (len < readBlockSize && fileIndex + 1 < fileCount) {   // 还没读够一个 block
            fileIndex++ // 读下一个文件
            start = 0   // 下一个文件从头开始
            if (fileIndex >= fileCount) { break } // 没有下一个文件了
            const left = readBlockSize - len      // 还需要读取的长度
            const part2 = await files[fileIndex].slice(start, start + left).arrayBuffer()
            const part2Len = part2.byteLength     // 读出来的大小
            len += part2Len        // 更新总大小
            start += part2Len      // 更新下次读取位置

            // 更新结果
            const sum = new Uint8Array(len)
            sum.set(new Uint8Array(block))
            sum.set(new Uint8Array(part2), block.byteLength)
            block = sum
        }
        return block
    }

    let buffer: ArrayBuffer | null = null // 读缓存
    let bufferIndex = 0;    //
    let outSize = 0;        // 已经返回的字节数
    return {
        [Symbol.asyncIterator]() {
            return {
                async next() {
                    if (outSize == totalSize) { return { done: true } }// 全部读完了

                    if (buffer == null) {
                        buffer = await read() // init 读取第一个 block
                    }

                    const piece = buffer.slice(bufferIndex, bufferIndex + pieceSize)// 从 buffer 中读
                    let pieceLen = piece.byteLength // 读出的长度
                    bufferIndex += pieceLen         // 更新下次读取位置
                    outSize += pieceLen             // 已经读取长度
                    if (pieceLen == pieceSize) { // buffer 中能完整地读出一个分片
                        return { done: false, value: piece }
                    }

                    if (buffer.byteLength < readBlockSize) { // 这个 buffer 已经是最后一部分
                        return { done: false, value: piece }
                    }

                    // buffer 不够 再读一个 buffer 出来
                    buffer = await read()
                    bufferIndex = 0
                    const left = pieceSize - pieceLen
                    const part2 = buffer.slice(bufferIndex, bufferIndex + left)
                    const part2Len = part2.byteLength
                    bufferIndex += part2Len
                    outSize += part2Len
                    const sum = new Uint8Array(pieceLen + part2Len)
                    sum.set(new Uint8Array(piece))
                    sum.set(new Uint8Array(part2), pieceLen)
                    return { done: false, value: sum }
                }
            }
        }
    }
}

type HashCallback = (version: string, pieceIndex: number, pieceLength: number, pieceHash: Uint8Array) => void
const workers = initWorkers()

// 计算 sha1 值。返回一个 Promise<void> 当其完成后才能继续读取下一分片。
// 当有多个 worker 时, 任务提交给可用的 worker 后即可继续读取下一分片。
async function hash(version: string, pieceIndex: number, pieceData: ArrayBuffer, callback: HashCallback) {
    return new Promise<void>((resolve) => {
        if (location.search.includes('sha1=fake')) {
            callback(version, pieceIndex, pieceData.byteLength, new Uint8Array(20))
            resolve()
            return
        }
        if (workers.length > 0) {
            resolve()// 尽快读取余下数据
            doHashWithWorker(version, pieceIndex, pieceData, callback)
        } else {// 非 worker 模式
            sha1(pieceData).then((result: Uint8Array) => {
                callback(version, pieceIndex, pieceData.byteLength, result)
                resolve() // 计算完后再读取接下来的数据
            })
        }
    })
}

function initWorkers() {
    let result: Worker[] = []
    try {
        const maxWorkerCount = Math.min(navigator.hardwareConcurrency || 1, 8);
        for (let index = 0; index < maxWorkerCount; index++) {
            result.push(new Worker(new URL('./worker', import.meta.url)))
        }
        // throw new Error('debug')
    } catch (e) {
        console.log('init worker error', e);
        result = []
    }
    console.log('workes length', result.length, result)
    return result
}

// 正在运行的 workers 的下标
const workingIndex = new Set<number>()

let maxWorkerIndex = 0
function doHashWithWorker(version: string, pieceIndex: number, pieceData: ArrayBuffer, callback: HashCallback) {
    let selectedWorker: Worker | null = null
    let selectIndex: number = -1
    for (let i = 0; i < workers.length; i++) {
        if (!workingIndex.has(i)) { // 该 worker 可用
            workingIndex.add(i) // 置为工作中
            selectIndex = i
            selectedWorker = workers[i]
            break
        }
    }
    if (selectIndex > maxWorkerIndex) {
        maxWorkerIndex = selectIndex
        console.log('maxWorkerIndex=', maxWorkerIndex)
    }
    const req: Req = {
        version,
        workerIndex: selectIndex,
        pieceIndex,
        pieceData,
    }
    // console.log('req=', req.workerIndex, req.pieceIndex)
    const start = new Date().getTime()
    if (selectedWorker != null) { // 发送消息给 worker 处理
        selectedWorker.postMessage(req)
        selectedWorker.onmessage = (e) => {
            const resp = e.data as Resp // 收到结果
            const cost = new Date().getTime() - start
            // console.log('cost', duration(cost), 'resp=', resp)
            callback(resp.version, resp.pieceIndex, resp.pieceLengh, resp.pieceHash)
            workingIndex.delete(resp.workerIndex)// 将该 worker 置为空闲
            // 如果有等待的任务就拿出来执行
            const task = waitingTask.shift()
            if (task) {
                // console.log('do previous task', task)
                doHashWithWorker(task.req.version, task.req.pieceIndex, task.req.pieceData, task.callback)
            }
        }
    } else { // 等待有可用的 worker
        // console.log('waiting a worker', req)
        waitingTask.push({ req, callback })
    }
}

export { genFilesSha1 }
