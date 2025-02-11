import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class FullBloodCount extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    wbcValue: Number;

    @IsOptional()
    @IsString({ each: true })
    wbcValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    neutrophilsValue: Number;

    @IsOptional()
    @IsString({ each: true })
    neutrophilsValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    lymphocytesValue: Number;

    @IsOptional()
    @IsString({ each: true })
    lymphocytesValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    eosinophilsValue: Number;

    @IsOptional()
    @IsString({ each: true })
    eosinophilsValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    monocytesValue: Number;

    @IsOptional()
    @IsString({ each: true })
    monocytesValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    basophilsValue: Number;

    @IsOptional()
    @IsString({ each: true })
    basophilsValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    heamoglobinValue: Number;

    @IsOptional()
    @IsString({ each: true })
    heamoglobinValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    rbcValue: Number;

    @IsOptional()
    @IsString({ each: true })
    rbcValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    htcpvcValue: Number;

    @IsOptional()
    @IsString({ each: true })
    htcpvcValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    mcvValue: Number;

    @IsOptional()
    @IsString({ each: true })
    mcvValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    mchValue: Number;

    @IsOptional()
    @IsString({ each: true })
    mchValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    mchcValue: Number;

    @IsOptional()
    @IsString({ each: true })
    mchcValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    plateletValue: Number;

    @IsOptional()
    @IsString({ each: true })
    plateletValueFlag: string | string[] | null;
}