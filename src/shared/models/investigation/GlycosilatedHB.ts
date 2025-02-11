import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class GlycosilatedHB extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    glycoHBValue: Number;

    @IsOptional()
    @IsString({ each: true })
    glycoHBValueFlag: string | string[] | null;

    @IsNotEmpty()
    @IsNumber()
    meanBloodGlucoseValue: Number;

    @IsOptional()
    @IsString({ each: true })
    meanBloodGlucoseValueFlag: string | string[] | null;
}