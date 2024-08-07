import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FastingBloodSugar } from './investigation/FastingBloodSugar';
import { InvestigationBase } from './investigation/investigationBase';

export async function validateInvestigationDataRequestBody(investigationId: number, body: any): Promise<InvestigationBase> {
    let requestBody = plainToInstance(FastingBloodSugar, body);

    const errors = await validate(requestBody, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
        throw new Error(`Validation failed! ${errors}`);
    }

    return requestBody as InvestigationBase;
}

