import { __ } from '@/i18n/gettext'

function format(template: string, ...args: any) {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' // 注意有引号
            ? args[number]
            : match
    })
}

function duration(ms: number) {
    if (ms < 1000) {        // 999 ms, 1 seconds
        return format(__('{0} ms'), ms)
    }
    if (ms < 1000 * 60) {   // 59 seconds, 60 seconds=1 minutes
        return format(__('{0} seconds'), toFixed(ms / 1000, 2))
    }
    return format(__('{0} minutes'), toFixed(ms / 1000 / 60, 2))
}

function toFixed(f: number, n: number) {
    const r = Math.pow(10, n)
    return Math.round(r * f) / r
}

export { format, duration, toFixed }

