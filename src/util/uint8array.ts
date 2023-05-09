const decoder = new TextDecoder()
const encoder = new TextEncoder()

function fromString(s: string) {
    return encoder.encode(s)
}

function toString(a: Uint8Array) {
    return decoder.decode(a)
}

function toHex(a: Uint8Array) {
    return Array.from(a).map(n => n.toString(16).padStart(2, '0')).join('')
}

function fromHex(s: string) {
    if (s.length % 2 !== 0) { return }
    try {
        const arr: number[] = []
        for (let i = 0; i < s.length; i = i + 2) {
            arr.push(parseInt(s.substring(i, i + 2), 16))
        }
        return new Uint8Array(arr)
    } catch { return }
}

export { fromString, toString, toHex, fromHex }

