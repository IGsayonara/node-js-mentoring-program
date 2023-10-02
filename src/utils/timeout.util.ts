export const stop = (timeout: number): Promise<unknown> => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}