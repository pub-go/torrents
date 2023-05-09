import { describe, expect, it } from 'vitest';
import { sizeString } from '../size';

describe('test size to string', () => {

    it('less than 1024', () => {
        expect(sizeString(0)).eq('0 B')
        expect(sizeString(1)).eq('1 B')
        expect(sizeString(1023)).eq('1023 B')
    })
    it('less than 1MB', () => {
        expect(sizeString(1024)).eq('1.00 KB')
        expect(sizeString(1025)).eq('1.00 KB')
        expect(sizeString(1024 * 1023)).eq('1023.00 KB')
    })
    it('less than 1GB', () => {
        expect(sizeString(1024 * 1024)).eq('1.00 MB')
        expect(sizeString(1024 * 1024 + 1)).eq('1.00 MB')
        expect(sizeString(1024 * 1024 * 1023)).eq('1023.00 MB')
    })
    it('less than 1TB', () => {
        expect(sizeString(1024 * 1024 * 1024)).eq('1.00 GB')
        expect(sizeString(1024 * 1024 * 1024 * 1023)).eq('1023.00 GB')
    })
    it('great than 1TB', () => {
        expect(sizeString(1024 * 1024 * 1024 * 1024)).eq('1.00 TB')
        expect(sizeString(1024 * 1024 * 1024 * 1024 * 10)).eq('10.00 TB')
    })
})
