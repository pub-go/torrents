import type { UploadRawFile } from "element-plus"

async function SHA1(data: string) {
    return sha1(new TextEncoder().encode(data))
}

async function sha1(data: BufferSource): Promise<ArrayBuffer> {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
    const buf = await crypto.subtle.digest('SHA-1', data)
    return buf
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
                    return { done: false, value: part }
                }
            }
        }
    }
}

type onProgress = (current: number, total: number) => void

const cache = new Map<string, Uint8Array>()

async function genFilesSha1(files: UploadRawFile[], pieceSize: number, onProgress: onProgress) {
    const totalSize = files.reduce((sum, f) => sum + f.size, 0)
    const key = files.map(f => f.uid).join('|') + pieceSize
    const cached = cache.get(key)
    if (cached) {
        onProgress(totalSize, totalSize)
        return cached
    }
    let readBytes = 0
    const hashArray: Uint8Array[] = []
    for await (let piece of readFiles(files, totalSize, pieceSize)) {
        if (piece) {
            readBytes += piece.byteLength
            onProgress(readBytes, totalSize)
            const hash = await sha1(piece)
            hashArray.push(new Uint8Array(hash))
        }
    }

    const len = hashArray.reduce((sum, i) => sum + i.byteLength, 0)
    const result = new Uint8Array(len)
    let i = 0
    for (const h of hashArray) {
        result.set(h, i)
        i += h.byteLength
    }
    cache.set(key, result)
    return result
}

export { SHA1, sha1, genFilesSha1 }
