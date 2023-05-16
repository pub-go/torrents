function format(template: string, ...args: any) {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' // 注意有引号
            ? args[number]
            : match
    })
}

const __ = (mark: string) => mark;

function duration(ms: number) {
    if (ms < 1000) {        // 999 ms, 1 seconds
        return { template: __('{0} ms'), args: ms }
    }
    if (ms < 1000 * 60) {   // 59 seconds, 60 seconds=1 minutes
        return { template: __('{0} seconds'), args: toFixed(ms / 1000, 2) }
    }
    return { template: __('{0} minutes'), args: toFixed(ms / 1000 / 60, 2) }
}

function toFixed(f: number, n: number) {
    const r = Math.pow(10, n)
    return Math.round(r * f) / r
}

export { format, duration, toFixed };
