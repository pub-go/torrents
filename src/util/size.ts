function sizeString(size: number) {
    if (size >= 1024 * 1024 * 1024 * 1024) { return (size / 1024 / 1024 / 1024 / 1024).toFixed(0) + 'TB' }
    if (size >= 1024 * 1024 * 1024) { return (size / 1024 / 1024 / 1024).toFixed(0) + 'GB' }
    if (size >= 1024 * 1024) { return (size / 1024 / 1024).toFixed(0) + 'MB' }
    if (size >= 1024) { return (size / 1024).toFixed(0) + 'KB' }
    return size + 'B'
}

export { sizeString }

