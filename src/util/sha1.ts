async function SHA1(data: string) {
    return sha1(new TextEncoder().encode(data))
}

async function sha1(data: BufferSource): Promise<ArrayBuffer> {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
    const buf = await crypto.subtle.digest('SHA-1', data)
    return buf
}

async function generatePieces(file: File, pieceSize: number) {
    const result: Uint8Array[] = []
    for (let i = 0; i * pieceSize < file.size; i++) {
        const start = i * pieceSize
        const end = start + pieceSize
        const piece = await file.slice(start, end).arrayBuffer()
        const hash = await sha1(piece)
        result.push(new Uint8Array(hash))
    }
    return result
}

export { SHA1, sha1, generatePieces }
