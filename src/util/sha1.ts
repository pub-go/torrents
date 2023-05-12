import type { UploadRawFile } from "element-plus"

async function SHA1(data: string) {
    return sha1(new TextEncoder().encode(data))
}

async function sha1(data: BufferSource): Promise<ArrayBuffer> {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
    const buf = await crypto.subtle.digest('SHA-1', data)
    return buf
}

type onProgress = (current: number, total: number) => void

async function doGenerate(file: File, pieceSize: number, onProgress: onProgress) {
    const result: Uint8Array[] = []
    let current = 0
    for (let i = 0; i * pieceSize < file.size; i++) {
        onProgress(current, file.size)
        current += pieceSize
        const start = i * pieceSize
        const end = start + pieceSize
        const piece = await file.slice(start, end).arrayBuffer()
        const hash = await sha1(piece)
        result.push(new Uint8Array(hash))
    }
    onProgress(file.size, file.size)
    return result
}

const cache = new Map<string, Uint8Array[]>()

async function generatePieces(file: UploadRawFile, pieceSize: number, onProgress: onProgress) {
    const key = file.uid + '|' + pieceSize
    const cached = cache.get(key)
    if (cached) {
        onProgress(file.size, file.size)
        return cached
    }
    const result = await doGenerate(file as File, pieceSize, onProgress)
    cache.set(key, result)
    return result
}

type progress = (processedBytes: number, totalBytes: number, processedFile: number, totalFile: number) => void

async function gen(files: UploadRawFile[], pieceSize: number, onProgress: progress) {
    const fileLength = files.length
    const totalSize = files.reduce((sum, f) => sum + f.size, 0)
    let fileIndex = 0
    let filePos = 0
    for (let processedBytes = 0; processedBytes < totalSize;) {
        onProgress(processedBytes, totalSize, fileIndex, fileLength)
        const currentFile = files[fileIndex]
        const left = currentFile.size - filePos
        let piece;
        if (left >= pieceSize) { // 当前文件还有一个分片的大小
            piece = await currentFile.slice(filePos, filePos + pieceSize).arrayBuffer()
        } else {
            if (fileIndex < fileLength) { // 后面还有文件 拼接起来
                piece = new Uint8Array(pieceSize)
                // 先把当前文件尾部读完
                const part = await currentFile.slice(filePos).arrayBuffer()
                piece.set(new Uint8Array(part))
                // 然后拼接下一个文件
                fileIndex++//todo
            }
        }
    }
}

export { SHA1, sha1, generatePieces }
