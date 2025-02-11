import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class CRP extends InvestigationBase {
    @IsString()
    @IsNotEmpty()
    crp: string;

    @IsOptional()
    @IsNumber()
    crpTitreValue: number;
    
    @IsOptional()
    @IsString({ each: true })
    crpTitreValueFlag: string | string[] | null;
}