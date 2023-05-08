interface Torrent {
    announce: string
    'announce-list'?: string[][] // http://bittorrent.org/beps/bep_0012.html
    comment?: string // https://wiki.theory.org/BitTorrentSpecification#Metainfo_File_Structure
    'created by': string
    'creation date'?: number
    info: TInfo
    'url-list'?: string[] // https://www.bittorrent.org/beps/bep_0019.html
}

interface TInfo {
    name: string
    'piece length': number
    pieces: Uint8Array
    private?: number // https://www.bittorrent.org/beps/bep_0027.html
    length?: number
    files?: TFile[]
    source?: string
}

interface TFile {
    length: number
    path: string[]
}

export type { Torrent }

