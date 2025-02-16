import { fetchTestRegistrationByPatient, getPeriodsWithTestRegisterIds, getTestRegistrationsForDateRange } from "../repositories/analysisRepository";
import { AnalysisData, FinancialAnalysisOutput } from "../types/investigationData";
import { getInvestigationRegistrationById } from "./investigationRegistrationService";
import { getAllInvestigations } from "./investigationService";

export async function getPatientAnalysisData(patientId: number, startDate?: string, endDate?: string, branchId?: number) {
    const testRegisters = await fetchTestRegistrationByPatient(patientId, startDate, endDate, branchId);

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

export async function getInvestigationAnalysisData(startDate?: string, endDate?: string, branchId?: number) {
    const testRegisters = await getTestRegistrationsForDateRange(startDate, endDate, branchId);

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

export async function getFinancialAnalysisData(step: string, startDate?: string, endDate?: string, branchId?: number) {
    const data = await getPeriodsWithTestRegisterIds(step, startDate, endDate, branchId);
    const tests = await getAllInvestigations(100, 0, '');
    const testPriceMap = new Map<number, number>();

    for (const test of tests.investigations) {
        testPriceMap.set(test.id, test.price);
    }

    const out: FinancialAnalysisOutput = {
        totalCost: 0,
        totalPaid: 0,
        periods: []
    }

    let totalCost = 0;
    let totalPaid = 0;

    for (const period of data) {
        let periodCost = 0;
        let periodPaid = 0;
        const detailsMap = new Map<number, number>();

        // Check if testRegisterIds is an array and not empty
        if (Array.isArray(period.testRegisterIds) && period.testRegisterIds.length > 0) {
            // Process each registration ID
            for (const id of period.testRegisterIds) {
                try {
                    const testRegister = await getInvestigationRegistrationById(id);
                    if (testRegister) {
                        totalCost += testRegister.total_cost;
                        totalPaid += testRegister.paid_price;
                        periodCost += testRegister.total_cost;
                        periodPaid += testRegister.paid_price;

                        for (const test of testRegister.registeredTests) {
                            const cost = detailsMap.get(test.test.id);
                            if (!cost) {
                                detailsMap.set(test.test.id, testPriceMap.get(test.test.id) ?? 0);
                            } else {
                                detailsMap.set(test.test.id, cost + (testPriceMap.get(test.test.id) ?? 0));
                            }
                        }
                    }
                } catch (error) {
                    console.error(`Error processing registration ID ${id}:`, error);
                    // Continue processing other IDs even if one fails
                    continue;
                }
            }
        }

        const periodTestDetails = Array.from(detailsMap, ([key, value]) => ({
            testId: key,
            testName: tests.investigations.find(item => item.id === key)?.name ?? 'Unknown Test',
            testTotalCost: value
        }));

        out.periods.push({
            startDate: period.startDateOfPeriod,
            endDate: period.endDateOfPeriod,
            periodCost: periodCost,
            periodPaid: periodPaid,
            tests: periodTestDetails
        });
    }

    out.totalCost = totalCost;
    out.totalPaid = totalPaid;
    return { data: out };
}