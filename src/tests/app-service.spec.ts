import { describe, it, expect } from 'vitest';
import { createMenaceReport, loadReports } from '../services/app-service';
import type { MenaceReport, MenaceReportPayload } from '../lib/types';

describe("Tests for services", ()=>{

    it("Should create a report", async () => {

        const report:MenaceReportPayload = {
            description:"Bit my toes",
            menaceLevel: 3,
            date: "",
            imageLinks:[]
            
        }

        const savedReport = await createMenaceReport(report);

    })

    it("Should read reports", async () => {
        const reports = await loadReports(10);
        console.log(reports);
    })

});