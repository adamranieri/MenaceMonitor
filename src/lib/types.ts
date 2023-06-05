
export type MenaceReport = {
    id: string 
    timestamp: number 
    description: string 
    menaceLevel: 1 | 2 | 3
}


export type MenaceReportPayload = {
    description: string 
    menaceLevel: 1 | 2 | 3
    imageLinks?: string[];
}