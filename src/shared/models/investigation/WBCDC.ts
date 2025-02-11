import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class WBCDC extends InvestigationBase {
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
}