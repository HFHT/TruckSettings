export function nullOrUndefined(e: any | undefined, v: any = '') {
    if (e === null) return v
    if (e === undefined) return v
    return e
}