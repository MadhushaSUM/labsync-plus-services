import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class SCholesterol extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    sCholesterolValue: Number;

    @IsOptional()
    @IsString({ each: true })
    sCholesterolValueFlag: string | string[] | null;
}