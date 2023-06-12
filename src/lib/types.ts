
export type MenaceReport = {
    id: string 
    date: string 
    description: string 
    menaceLevel: 1 | 2 | 3
    imageLinks: string[]
}

export function isMenaceReport(thing: any): thing is MenaceReport{
    return "id" in thing;
}


export type MenaceReportPayload = {
    description: string 
    date: string
    menaceLevel: 1 | 2 | 3
    imageLinks: string[];
}