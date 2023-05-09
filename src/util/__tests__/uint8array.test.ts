import { describe, expect, it } from 'vitest';
import { fromHex, fromString, toHex, toString } from '../uint8array';

describe('hex / uint8array', () => {
    it('can be to hex', () => {
        expect(toHex(fromString('Hello'))).eq('48656c6c6f')
        expect(toHex(fromString('你好'))).eq('e4bda0e5a5bd')
    })
    it('from hex', () => {
        expect(toString(fromHex('48656c6c6f')!)).eq('Hello')
        expect(toString(fromHex('e4bda0e5a5bd')!)).eq('你好')
    })
})