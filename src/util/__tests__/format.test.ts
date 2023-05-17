import { describe, expect, it } from 'vitest';
import { duration, format, toFixed } from '../format';

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

describe('duration', () => {
    it('format duration', () => {
        expect(duration(999)).eq('999 ms')
        expect(duration(1000)).eq('1 seconds')
        expect(duration(1010)).eq('1.01 seconds')
        expect(duration(6000)).eq('6 seconds')
        expect(duration(60000)).eq('1 minutes')
    })
})

describe('toFixed', () => {
    it('-0.6向负方向舍去, -0.5向正方向入, 0.4向负方向舍去, 0.5向正方向入', () => {
        expect(toFixed(1, 0)).eq(1)
        expect(toFixed(1.1, 0)).eq(1)
        expect(toFixed(1.5, 0)).eq(2)
        expect(toFixed(-1.1, 0)).eq(-1)
        expect(toFixed(-1.5, 0)).eq(-1)
        expect(toFixed(-1.6, 0)).eq(-2)
    })
    it('保留小数位数', () => {
        expect(toFixed(3.14159, 0)).eq(3)
        expect(toFixed(3.14159, 1)).eq(3.1)
        expect(toFixed(3.14159, 2)).eq(3.14)
        expect(toFixed(3.14159, 3)).eq(3.142)
        expect(toFixed(3.14159, 4)).eq(3.1416)
        expect(toFixed(3.14159, 5)).eq(3.14159)
        expect(toFixed(3.14159, 6)).eq(3.14159) // 和 number.toFixed 返回 string(末尾可以补0) 不同
        expect(toFixed(3.14159, 6)).eq(3.141590)// number 类型末尾的 0 其实就是相当于没写
    })
})