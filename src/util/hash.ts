import type { UploadRawFile } from "element-plus"
import { duration } from "./format"
import { sha1 } from './sha1'
import type { Req, Resp } from "./worker"
// 进度回调。如果返回 false 则终止计算
type onProgress = (current: number, total: number, version: string) => boolean
// 算完后点击上一步再点击下一步 如果文件和分片大小没变 就复用 sha1 结果
const cache = new Map<string, Uint8Array>()

async function genFilesSha1(files: UploadRawFile[], pieceSize: number, version: string, onProgress: onProgress) {
    const totalSize = files.reduce((sum, f) => sum + f.size, 0)

    // cache first
    const key = files.map(f => f.uid).join('|') + pieceSize
    const cached = cache.get(key)
    if (cached) {
        onProgress(totalSize, totalSize, version)
        return cached
    }

    // 对每个分片计算 sha1 值
    const hashArray: Uint8Array[] = await genPiecesSha1(files, pieceSize, totalSize, version, onProgress)

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

async function genPiecesSha1(files: UploadRawFile[], pieceSize: number, totalSize: number, version: string, onProgress: onProgress) {
    const hashArray: Uint8Array[] = []
    let index = 0// 分片位置
    let readBytes = 0// 已读取字节数 用于更新进度
    let doneBytes = 0
    await new Promise<void>(async (resolve) => {
        for await (let piece of readFiles(files, totalSize, pieceSize)) {
            if (piece) {
                readBytes += piece.byteLength
                if (!onProgress(readBytes, totalSize, version)) {
                    throw new Error('Canceled')// 如果界面上重置了任务允许终端计算
                }
                await hash(index++, piece, (index, pieceLength, result) => {
                    hashArray[index] = result // 分片结果保存
                    doneBytes += pieceLength // 已计算完成的字节数
                    if (doneBytes === totalSize) { resolve() }
                })// await 返回才继续读取下一分片
            }
        }
    })// 等待所有分片计算完成
    return hashArray
}

function readFiles(files: UploadRawFile[], totalSize: number, pieceSize: number) {
    const fileCount = files.length
    let fileIndex = 0
    let readBytes = 0
    let start = 0
    return {
        [Symbol.asyncIterator]() {
            return {
                async next() {
                    if (readBytes == totalSize) { return { done: true } }// 全部读完了

                    let part = await files[fileIndex].slice(start, start + pieceSize).arrayBuffer()// 读取当前文件
                    let len = part.byteLength   // 读出的大小
                    start += len                // 下次读取的位置
                    readBytes += len            // 已经读取的长度
                    while (len < pieceSize) {   // 还没读够一个分片
                        fileIndex++ // 读下一个文件
                        if (fileIndex >= fileCount) { break }// 没有下一个文件了
                        start = 0   // 下一个文件从头开始
                        const left = pieceSize - len    // 还需要读取的长度
                        const part2 = await files[fileIndex].slice(start, start + left).arrayBuffer()
                        const part2Len = part2.byteLength   // 读出来的大小
                        len += part2Len                 // 更新总大小
                        start += part2Len               // 更新下次读取位置
                        readBytes += part2Len           // 更新读取总大小

                        // 更新结果
                        const sum = new Uint8Array(len)
                        sum.set(new Uint8Array(part))
                        sum.set(new Uint8Array(part2), part.byteLength)
                        part = sum
                    }
                    return { done: false, value: new Uint8Array(part) }
                }
            }
        }
    }
}

type HashCallback = (pieceIndex: number, pieceLength: number, pieceHash: Uint8Array) => void
const workers = initWorkers()

// 计算 sha1 值。返回一个 Promise<void> 当其完成后才能继续读取下一分片。
// 当有多个 worker 时, 任务提交给可用的 worker 后即可继续读取下一分片。
async function hash(pieceIndex: number, pieceData: Uint8Array, callback: HashCallback) {
    return new Promise<void>((resolve) => {
        if (location.search.includes('sha1=fake')) {
            callback(pieceIndex, pieceData.byteLength, new Uint8Array(20))
            resolve()
            return
        }
        if (workers.length > 0) {
            resolve()// 尽快读取余下数据
            doHashWithWorker(pieceIndex, pieceData, callback)
        } else {// 非 worker 模式
            sha1(pieceData).then((result: Uint8Array) => {
                callback(pieceIndex, pieceData.byteLength, result)
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
// 等待队列
const waitingTask: { req: Req, callback: HashCallback }[] = []

function doHashWithWorker(pieceIndex: number, pieceData: Uint8Array, callback: HashCallback) {
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

    const req: Req = {
        workerIndex: selectIndex,
        pieceIndex: pieceIndex,
        pieceData: pieceData,
    }
    console.log('req=', req.workerIndex, req.pieceIndex)
    const start = new Date().getTime()
    if (selectedWorker != null) { // 发送消息给 worker 处理
        selectedWorker.postMessage(req)
        selectedWorker.onmessage = (e) => {
            const resp = e.data as Resp // 收到结果
            const cost = new Date().getTime() - start
            console.log('cost', duration(cost), 'resp=', resp)
            callback(resp.pieceIndex, resp.pieceLengh, resp.pieceHash)
            workingIndex.delete(resp.workerIndex)// 将该 worker 置为空闲
            // 如果有等待的任务就拿出来执行
            const task = waitingTask.shift()
            if (task) {
                console.log('do previous task', task)
                doHashWithWorker(task.req.pieceIndex, task.req.pieceData, task.callback)
            }
        }
    } else { // 等待有可用的 worker
        console.log('waiting a worker', req)
        waitingTask.push({ req, callback })
    }
}

export { genFilesSha1 }
