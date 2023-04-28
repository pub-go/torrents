import { describe, expect, it } from 'vitest';
import format from '../format';


describe('format', () => {
    it('format {0} ok', () => {
        expect(format('Hello, {0}', 'World')).toBe('Hello, World')
    })
    it('format {0} as is', () => {
        expect(format('Hello, {0}')).toBe('Hello, {0}')
    })
    it('format two', () => {
        expect(format('Hello, {0}, My name is {1}', "Tom", "Alice"))
            .toBe('Hello, Tom, My name is Alice')
    })
    it('format two seq', () => {
        expect(format('Hello {1}, My name is {0}', "Tom", "Alice"))
            .toBe('Hello Alice, My name is Tom')
    })
    it('too many args', () => {
        expect(format('Hello {1}, My name is {0}', "Tom", "Alice", "Other"))
            .toBe('Hello Alice, My name is Tom')
    })
})
