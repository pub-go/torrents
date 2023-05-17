import { fromString } from "@/util/uint8array";

type BType = 'string' | 'integer' | 'list' | 'dict'

interface BValue {
    Type(): BType
    Encode(): Uint8Array
}

class BString implements BValue {
    value: Uint8Array;
    constructor(value: string | Uint8Array) {
        if (typeof value === 'string') {
            this.value = fromString(value)
        } else {
            this.value = value
        }
    }
    Type(): BType {
        return 'string'
    }
    Encode(): Uint8Array {
        const prefix = fromString(this.value.length + ':')
        const result = new Uint8Array(this.value.length + prefix.length)
        result.set(prefix)
        result.set(this.value, prefix.length)
        return result
    }
}

class BInt implements BValue {
    value: number

    constructor(value: number) {
        this.value = value | 0
    }

    Type(): BType {
        return 'integer'
    }
    Encode(): Uint8Array {
        return fromString(`i${this.value}e`)
    }
}

class BList implements BValue {
    value: BValue[]
    constructor(value: BValue[]) {
        this.value = value
    }
    Type(): BType {
        return 'list'
    }
    Encode(): Uint8Array {
        const values = this.value.map(i => i.Encode())
        const length = values.reduce(
            (acc, i) => { acc += i.length; return acc },
            0,
        )
        const result = new Uint8Array(length + 2)// l, e
        result.set(['l'.charCodeAt(0)])
        let i = 1
        for (let item of values) {
            result.set(item, i)
            i += item.length
        }
        result.set(['e'.charCodeAt(0)], i)
        return result
    }
}

class BDict implements BValue {
    value: Record<string, BValue>;
    constructor(value: Record<string, BValue>) {
        this.value = value
    }
    Type(): BType {
        return 'dict'
    }
    Encode(): Uint8Array {
        const kvs = Object.keys(this.value)
            .sort()
            .map(k => [new BString(k).Encode(), this.value[k].Encode()])
        const len = kvs.reduce(
            (acc, pair) => acc + pair[0].length + pair[1].length,
            0
        )
        const result = new Uint8Array(len + 2)// d, e
        result.set(['d'.charCodeAt(0)])
        let i = 1 // length of 'd'
        for (let pair of kvs) {
            const key = pair[0]
            result.set(key, i)
            i += key.length
            const value = pair[1]
            result.set(value, i)
            i += value.length
        }
        result.set(['e'.charCodeAt(0)], i)
        return result
    }
}

function getType(value: any) {
    if (ArrayBuffer.isView(value)) return 'arraybufferview'
    if (Array.isArray(value)) return 'array'
    if (value instanceof Number) return 'number'
    if (value instanceof Boolean) return 'boolean'
    if (value instanceof Set) return 'set'
    if (value instanceof Map) return 'map'
    if (value instanceof String) return 'string'
    // if (value instanceof ArrayBuffer) return 'arraybuffer'
    return typeof value
}

function toBValue(v: any): BValue {
    // console.log(typeof v, getType(v), v)
    switch (getType(v)) {
        // case 'arraybuffer':
        // return new BString(new Uint8Array(v as ArrayBuffer))
        case 'arraybufferview':
            const view = v as ArrayBufferView
            return new BString(new Uint8Array(view.buffer, view.byteOffset, view.byteLength))
        case 'string': return new BString(v)

        case 'number': return new BInt(v)
        case 'boolean': return new BInt(v ? 1 : 0)

        case 'set':  // fallthrough
        case 'array':
            const list: BValue[] = []
            for (const item of v) {
                list.push(toBValue(item))
            }
            return new BList(list)

        case 'map':
            const map: Record<string, BValue> = {}
            for (const key of [...v.keys()].sort()) {
                const value = v.get(key)
                console.log(key, value)
                map[key] = toBValue(value)
            }
            return new BDict(map)
        case 'object':
            const dict: Record<string, BValue> = {}
            const keys: string[] = []
            for (const key in v) {
                keys.push(key)
            }
            keys.sort()
            for (const key of keys) {
                dict[key] = toBValue(v[key])
            }
            return new BDict(dict)
    }
    throw new Error('unsupported input: ' + v)
}

export type { BType, BValue };
export { BString, BInt, BList, BDict, toBValue };

