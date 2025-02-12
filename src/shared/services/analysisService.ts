import { fetchTestRegistrationByPatient, getTestRegistrationsForDateRange } from "../repositories/analysisRepository";
import { AnalysisData } from "../types/investigationData";

export async function getPatientAnalysisData(patientId: number, startDate?: string, endDate?: string) {
    const testRegisters = await fetchTestRegistrationByPatient(patientId, startDate, endDate);

    let totalCount = 0;
    const dataMap = new Map<number, {
        testId: number,
        testName: string,
        count: number,
        tests: {
            date: Date,
            refNumber?: number,
            testRegisterId: number,
            data: {},
        }[]
    }>();

    for (const register of testRegisters.registrations) {
        const { date, ref_number, id: testRegisterId } = register;

        for (const registeredTest of register.registeredTests) {
            totalCount += 1;

            const { id: testId, name: testName } = registeredTest.test;
            const testData = registeredTest.data;
            let data = dataMap.get(testId);

            if (!data) {
                data = {
                    testId,
                    testName,
                    count: 0,
                    tests: []
                };
                dataMap.set(testId, data);
            }

            data.count += 1;
            data.tests.push({ date, refNumber: ref_number, testRegisterId, data: testData });
        }
    }

    const pieChartData = Array.from(dataMap.values());

    const data: AnalysisData = {
        totalTestNumber: totalCount,
        pieChartData
    };

    return { data };
}

export async function getInvestigationAnalysisData(startDate?: string, endDate?: string) {
    const testRegisters = await getTestRegistrationsForDateRange(startDate, endDate);

    let totalCount = 0;
    const dataMap = new Map<number, {
        testId: number,
        testName: string,
        count: number,
        tests: {
            date: Date,
            refNumber?: number,
            testRegisterId: number,
            data: {},
        }[]
    }>();

    for (const register of testRegisters.registrations) {
        const { date, ref_number, id: testRegisterId } = register;

        for (const registeredTest of register.registeredTests) {
            totalCount += 1;

            const { id: testId, name: testName } = registeredTest.test;
            const testData = registeredTest.data;
            let data = dataMap.get(testId);

            if (!data) {
                data = {
                    testId,
                    testName,
                    count: 0,
                    tests: []
                };
                dataMap.set(testId, data);
            }

            data.count += 1;
            data.tests.push({ date, refNumber: ref_number, testRegisterId, data: testData });
        }
    }

    const pieChartData = Array.from(dataMap.values());

    const data: AnalysisData = {
        totalTestNumber: totalCount,
        pieChartData
    };

    return { data };
}