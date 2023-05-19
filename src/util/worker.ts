interface Req {
    version: string,
    workerIndex: number
    pieceIndex: number
    pieceData: ArrayBuffer
}

interface Resp {
    version: string,
    workerIndex: number
    pieceIndex: number
    pieceLengh: number
    pieceHash: Uint8Array
}

self.addEventListener('message', (e) => {
    const req = e.data as Req
    crypto.subtle.digest('SHA-1', req.pieceData).then(result => {
        self.postMessage({
            version: req.version,
            workerIndex: req.workerIndex,
            pieceIndex: req.pieceIndex,
            pieceLengh: req.pieceData.byteLength,
            pieceHash: new Uint8Array(result),
        } as Resp)
    })
});

export type { Req, Resp }
