import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class BloodSugarProfile extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    fbsValue: number;

    @IsOptional()
    @IsString({ each: true })
    fbsValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    ppbsPreBfValue: number;

    @IsOptional()
    @IsString({ each: true })
    ppbsPreBfValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    rbsAfterLnValue: number;

    @IsOptional()
    @IsString({ each: true })
    rbsAfterLnValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    ppbsPreLnValue: number;

    @IsOptional()
    @IsString({ each: true })
    ppbsPreLnValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    rbsAfterDnValue: number;

    @IsOptional()
    @IsString({ each: true })
    rbsAfterDnValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    ppbsPreDnValue: number;

    @IsOptional()
    @IsString({ each: true })
    ppbsPreDnValueFlag: string | string[] | null;
}