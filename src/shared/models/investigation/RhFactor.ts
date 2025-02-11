import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class RhFactor extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    rhFactor: string;

    @IsOptional()
    @IsNumber()
    rhFactorTitreValue: number;

    @IsOptional()
    @IsString({ each: true })
    rhFactorTitreValueFlag: string | string[] | null;
}