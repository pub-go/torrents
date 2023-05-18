interface Req {
    workerIndex: number
    pieceIndex: number
    pieceData: ArrayBuffer
}

interface Resp {
    workerIndex: number
    pieceIndex: number
    pieceLengh: number
    pieceHash: Uint8Array
}

self.addEventListener('message', (e) => {
    const req = e.data as Req
    crypto.subtle.digest('SHA-1', req.pieceData).then(result => {
        self.postMessage({
            workerIndex: req.workerIndex,
            pieceIndex: req.pieceIndex,
            pieceLengh: req.pieceData.byteLength,
            pieceHash: new Uint8Array(result),
        } as Resp)
    })
});

export type { Req, Resp }
