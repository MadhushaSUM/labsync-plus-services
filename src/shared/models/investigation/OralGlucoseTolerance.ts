import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class OralGlucoseTolerance extends InvestigationBase {
    @IsString()
    @IsNotEmpty()
    glucoseWeight: string;

    @IsNumber()
    @IsNotEmpty()
    fbsValue: Number;

    @IsOptional()
    @IsString({ each: true })
    fbsValueFlag: string | string[] | null;

    @IsNumber()
    @IsOptional()
    firstHourValue: Number;

    @IsOptional()
    @IsString({ each: true })
    firstHourValueFlag: string | string[] | null;

    @IsNumber()
    @IsOptional()
    secondHourValue: Number;

    @IsOptional()
    @IsString({ each: true })
    secondHourValueFlag: string | string[] | null;
}
