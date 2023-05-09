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

export { SHA1, sha1, generatePieces }
