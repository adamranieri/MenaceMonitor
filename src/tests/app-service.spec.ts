import { describe, it, expect } from 'vitest';
import { createMenaceReport } from '../services/app-service';
import type { MenaceReport } from '../lib/types';

describe("Tests for services", ()=>{

    it("Should create a report", async ()=>{

        const report:MenaceReport = {
            id:"101",
            description:"Bit my toes",
            menaceLevel: 3,
            timestamp: 0
        }

        const savedReport = await createMenaceReport(report);
        console.log(savedReport)

    })

});