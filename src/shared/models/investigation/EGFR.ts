import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class EGFR extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    sCreatinineValue: Number;

    @IsNotEmpty()
    @IsNumber()
    egfrValue: Number;

    @IsOptional()
    @IsString({ each: true })
    egfrValueFlag: string | string[] | null;
}