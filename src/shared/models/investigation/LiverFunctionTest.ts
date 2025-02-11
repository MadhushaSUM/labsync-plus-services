import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class LiverFunctionTest extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    sgotValue: number;

    @IsOptional()
    @IsString({ each: true })
    sgotValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    sgptValue: number;

    @IsOptional()
    @IsString({ each: true })
    sgptValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    sAlkalinePhosValue: number;

    @IsOptional()
    @IsString({ each: true })
    sAlkalinePhosValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    totalBilirubinValue: number;

    @IsOptional()
    @IsString({ each: true })
    totalBilirubinValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    directBilirubinValue: number;

    @IsOptional()
    @IsString({ each: true })
    directBilirubinValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    indirectBilirubinValue: number;

    @IsOptional()
    @IsString({ each: true })
    indirectBilirubinValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    totalProteinsValue: number;

    @IsOptional()
    @IsString({ each: true })
    totalProteinsValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    albuminValue: number;

    @IsOptional()
    @IsString({ each: true })
    albuminValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    globulinValue: number;

    @IsOptional()
    @IsString({ each: true })
    globulinValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    agRatioValue: number;

    @IsNumber()
    @IsNotEmpty()
    gammaGtValue: number;

    @IsOptional()
    @IsString({ each: true })
    gammaGtValueFlag: string | string[] | null;
}
