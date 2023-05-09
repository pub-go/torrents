import { toString } from '@/util/uint8array';
import { describe, expect, it } from 'vitest';
import { BDict, BInt, BList, BString, decode, toBValue } from '../';

describe('to BValue', () => {
    it('eq', () => {
        expect(toBValue(0)).deep.eq(new BInt(0))
        expect(toBValue('Hello')).deep.eq(new BString('Hello'))
        expect(toBValue([100, 'Hello'])).deep.eq(new BList([new BInt(100), new BString('Hello')]))
        expect(toBValue({
            foo: 'bar',
            isBoolean: false,
            list: [['inner', 'item2'], ['second']],
            dict: {
                'a-b': 'cd',
            }
        })).deep.eq(new BDict({
            dict: new BDict({
                'a-b': new BString('cd')
            }),
            foo: new BString('bar'),
            isBoolean: new BInt(0),
            list: new BList([
                new BList([new BString('inner'), new BString('item2')]),
                new BList([new BString('second')]),
            ]),
        }))
    })
})

describe('encode', () => {
    it('encode string', () => {
        expect(toString(new BString('').Encode())).eq('0:')
        expect(toString(new BString('Hello').Encode())).eq('5:Hello')
        expect(toString(new BString('你好').Encode())).eq('6:你好')
    })
    it('encode int', () => {
        expect(toString(new BInt(0).Encode())).eq('i0e')
        expect(toString(new BInt(1).Encode())).eq('i1e')
        expect(toString(new BInt(-1).Encode())).eq('i-1e')
    })
    it('encode list', () => {
        expect(toString(new BList([]).Encode())).eq('le')
        expect(toString(new BList([new BString('Hello')]).Encode())).eq('l5:Helloe')
    })
    it('encode dict', () => {
        expect(toString(new BDict({}).Encode())).eq('de')
        expect(toString(new BDict({
            'k1': new BString('Hello'),
        }).Encode())).eq('d2:k15:Helloe')
        expect(toString(new BDict({
            'k1': new BString('Hello'),
            'a': new BInt(1),
        }).Encode())).eq('d1:ai1e2:k15:Helloe')
    })
})

describe('decode', () => {
    it('decode str', () => {
        const v = decode(new BString('Hello').Encode())
        expect(v.Type()).eq('string')
        expect(v).instanceOf(BString)
        expect(toString(((v as BString).value))).eq('Hello')
    })
    it('decode CJK str', () => {
        const v = decode(new BString('你好').Encode())
        expect(v.Type()).eq('string')
        expect(v).instanceOf(BString)
        expect(toString(((v as BString).value))).eq('你好')
    })
    it('decode int', () => {
        const v = decode(new BInt(0).Encode())
        expect(v.Type()).eq('integer')
        expect(v).instanceOf(BInt)
        expect(((v as BInt).value)).eq(0)
        expect(((decode(new BInt(-1).Encode()) as BInt).value)).eq(-1)
        expect(((decode(new BInt(1).Encode()) as BInt).value)).eq(1)
        expect(((decode(new BInt(1 << 20).Encode()) as BInt).value)).eq(1048576)
    })
    it('decode list', () => {
        const v = decode(new BList([new BString('Hello'), new BInt(100), new BList([])]).Encode())
        expect(v.Type()).eq('list')
        expect(v).instanceOf(BList)
        expect(v).deep.eq(new BList([new BString('Hello'), new BInt(100), new BList([])]))

        expect(decode(new BList([]).Encode())).deep.eq(new BList([]))
    })
    it('decode list', () => {
        const v = decode(new BDict({}).Encode())
        expect(v.Type()).eq('dict')
        expect(v).instanceOf(BDict)
        expect(v).deep.eq(new BDict({}))

        expect(decode(new BDict({
            "s": new BString('Hello'),
            'a': new BInt(10),
            'l': new BList([
                new BList([new BString('ok')]),
                new BInt(-10),
            ]),
            'd': new BDict({
                'b': new BInt(1),
            }),
        }).Encode())).deep.eq(new BDict({
            "s": new BString('Hello'),
            'a': new BInt(10),
            'l': new BList([
                new BList([new BString('ok')]),
                new BInt(-10),
            ]),
            'd': new BDict({
                'b': new BInt(1),
            }),
        }))
    })
})
