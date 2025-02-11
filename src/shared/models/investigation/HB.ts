import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class HB extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    hbValue: number;

    @IsOptional()
    @IsString({ each: true })
    hbValueFlag: string | string[] | null;
}