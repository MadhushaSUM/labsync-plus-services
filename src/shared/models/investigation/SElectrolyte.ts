import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class SElectrolyte extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    sodiumValue: Number;

    @IsOptional()
    @IsString({ each: true })
    sodiumValueFlag: string | string[] | null;

    @IsNotEmpty()
    @IsNumber()
    potassiumValue: Number;

    @IsOptional()
    @IsString({ each: true })
    potassiumValueFlag: string | string[] | null;
}