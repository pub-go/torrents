/// <reference types="vite/client" />
declare interface GitInfo {
    author: string,
    subject: string,
    author: string,
    commit: string,
    commitLong: string,
    timestampt: string,
    time: string,
}
declare const __GIT_INFO__: GitInfo;
declare module 'element-plus/dist/locale/en.mjs';
declare module 'element-plus/dist/locale/zh-cn.mjs';
declare function go_sha1(Uint8Array, Uint8Array): Uint8Array;
declare const Go: any;