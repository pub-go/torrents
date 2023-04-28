export { };
declare module 'vue' {
    export interface ComponentCustomProperties {
        __: (msgid: string) => string
        _x: (context: string, msgid: string) => string
        _n: (msgid: string, plural: string, n: number) => string
        _xn: (context: string, msgid: string, plural: string, n: number) => string
    }
}
