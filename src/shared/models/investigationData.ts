import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FastingBloodSugar } from './investigation/FastingBloodSugar';
import { InvestigationBase } from './investigation/investigationBase';
import { Test } from '../types/Investigation';
import { RandomBloodSugar } from './investigation/RandomBloodSugar';
import { PostPrandialBloodSugar } from './investigation/PostPrandialBloodSugar';
import { OralGlucoseTolerance } from './investigation/OralGlucoseTolerance';
import { LipidProfile } from './investigation/LipidProfile';
import { FullBloodCount } from './investigation/FullBloodCount';
import { WBCDC } from './investigation/WBCDC';
import { HB } from './investigation/HB';
import { ESR } from './investigation/ESR';
import { CRP } from './investigation/CRP';
import { UFR } from './investigation/UFR';
import { OTPT } from './investigation/OTPT';
import { SCalcium } from './investigation/SCalcium';
import { SElectrolyte } from './investigation/SElectrolyte';
import { SCholesterol } from './investigation/SCholesterol';
import { RCholesterol } from './investigation/RCholesterol';
import { SAlkPhosphatase } from './investigation/SAlkPhosphatase';
import { SCreatinine } from './investigation/SCreatinine';
import { EGFR } from './investigation/EGFR';
import { UrineHCG } from './investigation/UrineHCG';
import { DengueTest } from './investigation/DengueTest';
import { RhFactor } from './investigation/RhFactor';
import { LiverFunctionTest } from './investigation/LiverFunctionTest';
import { SFR } from './investigation/SFR';
import { BloodUrea } from './investigation/BloodUrea';
import { SProteins } from './investigation/SProteins';
import { Bilirubin } from './investigation/Bilirubin';
import { GammaGT } from './investigation/GammaGT';
import { GlycosilatedHB } from './investigation/GlycosilatedHB';
import { HIV } from './investigation/HIV';
import { BloodGroup } from './investigation/BloodGroup';
import { BloodSugarProfile } from './investigation/BloodSugarProfile';
import { UrineSugar } from './investigation/UrineSugar';
import { CardiacTroponinT } from './investigation/CardiacTroponinT';
import { CardiacTroponinI } from './investigation/CardiacTroponinI';

export async function validateInvestigationDataRequestBody(investigationId: number, body: any): Promise<InvestigationBase> {
    let requestBody;
    switch (Number(investigationId)) {
        case 1:
            requestBody = plainToInstance(FastingBloodSugar, body);
            break;
        case 2:
            requestBody = plainToInstance(RandomBloodSugar, body);
            break;
        case 3:
            requestBody = plainToInstance(PostPrandialBloodSugar, body);
            break;
        case 4:
            requestBody = plainToInstance(OralGlucoseTolerance, body);
            break;
        case 5:
            requestBody = plainToInstance(LipidProfile, body);
            break;
        case 6:
            requestBody = plainToInstance(FullBloodCount, body);
            break;
        case 7:
            requestBody = plainToInstance(WBCDC, body);
            break;
        case 8:
            requestBody = plainToInstance(HB, body);
            break;
        case 9:
            requestBody = plainToInstance(ESR, body);
            break;
        case 10:
            requestBody = plainToInstance(CRP, body);
            break;
        case 11:
            requestBody = plainToInstance(UFR, body);
            break;
        case 12:
            requestBody = plainToInstance(OTPT, body);
            break;
        case 13:
            requestBody = plainToInstance(SCalcium, body);
            break;
        case 14:
            requestBody = plainToInstance(SElectrolyte, body);
            break;
        case 15:
            requestBody = plainToInstance(SCholesterol, body);
            break;
        case 16:
            requestBody = plainToInstance(RCholesterol, body);
            break;
        case 17:
            requestBody = plainToInstance(SAlkPhosphatase, body);
            break;
        case 18:
            requestBody = plainToInstance(SCreatinine, body);
            break;
        case 19:
            requestBody = plainToInstance(EGFR, body);
            break;
        case 20:
            requestBody = plainToInstance(UrineHCG, body);
            break;
        case 21:
            requestBody = plainToInstance(DengueTest, body);
            break;
        case 22:
            requestBody = plainToInstance(RhFactor, body);
            break;
        case 23:
            requestBody = plainToInstance(LiverFunctionTest, body);
            break;
        case 24:
            requestBody = plainToInstance(SFR, body);
            break;
        case 25:
            requestBody = plainToInstance(BloodUrea, body);
            break;
        case 26:
            requestBody = plainToInstance(SProteins, body);
            break;
        case 27:
            requestBody = plainToInstance(Bilirubin, body);
            break;
        case 28:
            requestBody = plainToInstance(GammaGT, body);
            break;
        case 29:
            requestBody = plainToInstance(GlycosilatedHB, body);
            break;
        case 30:
            requestBody = plainToInstance(HIV, body);
            break;
        case 31:
            requestBody = plainToInstance(BloodGroup, body);
            break;
        case 32:
            requestBody = plainToInstance(BloodSugarProfile, body);
            break;
        case 33:
            requestBody = plainToInstance(UrineSugar, body);
            break;
        case 34:
            requestBody = plainToInstance(CardiacTroponinT, body);
            break;
        case 35:
            requestBody = plainToInstance(CardiacTroponinI, body);
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

