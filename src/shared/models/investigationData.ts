import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FastingBloodSugar } from './investigation/FastingBloodSugar';
import { InvestigationBase } from './investigation/investigationBase';
import { Test } from '../types/Investigation';
import { RandomBloodSugar } from './investigation/RandomBloodSugar';

export async function validateInvestigationDataRequestBody(investigationId: number, body: any): Promise<InvestigationBase> {
    let requestBody;
    switch (Number(investigationId)) {
        case 1:
            requestBody = plainToInstance(FastingBloodSugar, body);
            break;
        case 2:
            requestBody = plainToInstance(RandomBloodSugar, body);
            break;
        default:
            throw new Error(`Invalid investigation id: ${investigationId}`);
    }

    const errors = await validate(requestBody, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
        throw new Error(`Validation failed! ${errors}`);
    }

    return requestBody as InvestigationBase;
}

export function validateInvestigation(investigation: any) {
    if (
        !investigation.id ||
        !investigation.name ||
        !investigation.code ||
        !investigation.price ||
        !investigation.version
    ) {
        throw new Error('Invalid investigation data');
    }

    const verifiedTest: Test = {
        id: investigation.id,
        name: investigation.name,
        code: investigation.code,
        price: investigation.price,
        version: investigation.version,
    }

    return verifiedTest;

}

