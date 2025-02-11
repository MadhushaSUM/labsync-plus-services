import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class Bilirubin extends InvestigationBase {
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
}
