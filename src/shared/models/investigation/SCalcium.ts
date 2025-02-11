import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class SCalcium extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    totalCalciumValue: Number;

    @IsOptional()
    @IsString({ each: true })
    totalCalciumValueFlag: string | string[] | null;

    @IsNotEmpty()
    @IsNumber()
    ionizedCalciumValue: Number;

    @IsOptional()
    @IsString({ each: true })
    ionizedCalciumValueFlag: string | string[] | null;
}