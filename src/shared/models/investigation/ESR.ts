import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class ESR extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    esr1sthrValue: number;

    @IsOptional()
    @IsString({ each: true })
    esr1sthrValueFlag: string | string[] | null;
}