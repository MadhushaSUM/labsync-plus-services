import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class SAlkPhosphatase extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    sAlkalinePhosValue: Number;

    @IsOptional()
    @IsString({ each: true })
    sAlkalinePhosValueFlag: string | string[] | null;
}