import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";


export class OTPT extends InvestigationBase {
    @IsNotEmpty()
    @IsNumber()
    sgotValue: number;

    @IsOptional()
    @IsString({ each: true })
    sgotValueFlag: string | string[] | null;

    @IsNotEmpty()
    @IsNumber()
    sgptValue: number;

    @IsOptional()
    @IsString({ each: true })
    sgptValueFlag: string | string[] | null;
}