import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class RCholesterol extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    rCholesterolValue: Number;

    @IsOptional()
    @IsString({ each: true })
    rCholesterolValueFlag: string | string[] | null;
}