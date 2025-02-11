import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class GammaGT extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    gammaGtValue: Number;

    @IsOptional()
    @IsString({ each: true })
    gammaGtValueFlag: string | string[] | null;
}