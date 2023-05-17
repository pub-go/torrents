let sha1 = async function (data: Uint8Array): Promise<Uint8Array> {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
    const buf = await crypto.subtle.digest('SHA-1', data)
    return new Uint8Array(buf)
}

import wasmURL from '../assets/main.wasm?url';

if (typeof WebAssembly !== "undefined") {
    console.log("wasm enabled")
    const go = new Go();
    const wasmResult = await WebAssembly.instantiateStreaming(fetch(wasmURL), go.importObject);
    console.log(wasmResult)
    go.run(wasmResult.instance);
    sha1 = async (data: Uint8Array) => {
        const result = new Uint8Array(20)
        return go_sha1(data, result)
    }
}

export { sha1 };
