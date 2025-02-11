import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class BloodUrea extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    bloodUreaValue: Number;

    @IsOptional()
    @IsString({ each: true })
    bloodUreaValueFlag: string | string[] | null;
}