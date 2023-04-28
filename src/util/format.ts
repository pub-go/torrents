export default function (format: string, ...args: any) {
    return format.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' // 注意有引号
            ? args[number]
            : match
    })
}
