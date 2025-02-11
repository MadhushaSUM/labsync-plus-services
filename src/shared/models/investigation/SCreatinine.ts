import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class SCreatinine extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    sCreatinineValue: Number;

    @IsOptional()
    @IsString({ each: true })
    sCreatinineValueFlag: string | string[] | null;
}