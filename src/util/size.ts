import { format } from "./format"

function sizeString(size: number) {
    if (size < 1024) {
        return format(('{0} B'), size)
    }
    if (size < 1024 * 1024) {
        return format(('{0} KB'), (size / 1024).toFixed(2))
    }
    if (size < 1024 * 1024 * 1024) {
        return format(('{0} MB'), (size / 1024 / 1024).toFixed(2))
    }
    if (size < 1024 * 1024 * 1024 * 1024) {
        return format(('{0} GB'), (size / 1024 / 1024 / 1024).toFixed(2))
    }
    return format(('{0} TB'), (size / 1024 / 1024 / 1024 / 1024).toFixed(2))
}

export { sizeString }

