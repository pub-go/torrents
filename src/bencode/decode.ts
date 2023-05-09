import { toString } from "@/util/uint8array";
import { BDict, BInt, BList, BString, type BValue } from "./encode";

function decode(a: Uint8Array): BValue {
    return new Decoder(a).readValue()
}

const num_zero = '0'.charCodeAt(0)
const num_nine = '9'.charCodeAt(0)
const int_start = 'i'.charCodeAt(0)
const list_start = 'l'.charCodeAt(0)
const dict_start = 'd'.charCodeAt(0)
const str_split = ':'.charCodeAt(0)
const end = 'e'.charCodeAt(0)

class Decoder {
    a: Uint8Array;
    idx: number = 0;

    constructor(a: Uint8Array) {
        this.a = a
    }

    reset() {
        this.idx = 0
    }

    read(): number {
        return this.a[this.idx++]
    }

    unread() {
        this.idx--
    }

    readValue(): BValue {
        const current = this.read()
        if (current >= num_zero && current <= num_nine) {
            this.unread()
            return this.readString()
        }
        else if (current === int_start) {
            return new BInt(this.readIntUitl(end))
        }
        else if (current === list_start) {
            return this.readList()
        }
        else if (current === dict_start) {
            return this.readDict()
        }
        throw new Error(`invalid input`)
    }

    readString(): BString {
        const strLen = this.readIntUitl(str_split)
        const value: number[] = []
        for (let i = 0; i < strLen; i++) {
            value.push(this.read())
        }
        return new BString(new Uint8Array(value))
    }

    readIntUitl(end: number): number {
        const value: number[] = []
        let v: number
        while (true) {
            v = this.read()
            if (v === undefined) {
                throw new Error(`EOF reached when idx=${this.idx}`)
            }
            if (v === end) { break }
            value.push(v)
        }
        const s = toString(new Uint8Array(value))
        const n = parseInt(s, 10)
        if (isNaN(n)) {
            throw new Error(`NaN: ${s}`)
        }
        return n
    }

    readList() {
        const list: BValue[] = []
        while (true) {
            const n = this.read()
            if (n === end) {
                break
            }
            this.unread()
            list.push(this.readValue())
        }
        return new BList(list)
    }

    readDict() {
        const dict: Record<string, BValue> = {}
        while (true) {
            const n = this.read()
            if (n === end) {
                break
            }
            this.unread()
            const key = this.readString()
            const value = this.readValue()
            dict[toString(key.value)] = value
        }
        return new BDict(dict)
    }

}

export { decode };
