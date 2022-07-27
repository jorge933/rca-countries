export interface Country {
    name: Name,
    population: number,
    flags: {svg: string},
    region: string,
    subregion: string,
    capital: string[],
    topLevelDomain: string,
    currencies: Object
    borders: string[],
    languages: string[],
    flag: string,
}

export interface Currency {
    name: string
}

export interface NativeName {
    common: string
}

interface Name {
    common: string,
    nativeName: string
}