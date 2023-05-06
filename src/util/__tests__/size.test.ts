import { describe, expect, it } from 'vitest';
import { sizeString } from '../size';

describe('test size to string', () => {
    it('less than 1024', () => {
        expect(sizeString(0)).eq('0B')
        expect(sizeString(1)).eq('1B')
        expect(sizeString(1023)).eq('1023B')
    })
    it('less than 1MB', () => {
        expect(sizeString(1024)).eq('1KB')
        expect(sizeString(1025)).eq('1KB')
        expect(sizeString(1024 * 1023)).eq('1023KB')
    })
    it('less than 1GB', () => {
        expect(sizeString(1024 * 1024)).eq('1MB')
        expect(sizeString(1024 * 1024 + 1)).eq('1MB')
        expect(sizeString(1024 * 1024 * 1023)).eq('1023MB')
    })
    it('less than 1TB', () => {
        expect(sizeString(1024 * 1024 * 1024)).eq('1GB')
        expect(sizeString(1024 * 1024 * 1024 * 1023)).eq('1023GB')
    })
    it('great than 1TB', () => {
        expect(sizeString(1024 * 1024 * 1024 * 1024)).eq('1TB')
        expect(sizeString(1024 * 1024 * 1024 * 1024 * 10)).eq('10TB')
    })
})
