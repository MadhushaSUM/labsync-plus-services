import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class LipidProfile extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    totalCholesterolValue: Number;

    @IsOptional()
    @IsString({ each: true })
    totalCholesterolValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    triglyceridsValue: Number;

    @IsOptional()
    @IsString({ each: true })
    triglyceridsValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    hdlCholesterolValue: Number;

    @IsOptional()
    @IsString({ each: true })
    hdlCholesterolValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    ldlCholesterolValue: Number;

    @IsOptional()
    @IsString({ each: true })
    ldlCholesterolValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    vldlCholesterolValue: Number;

    @IsOptional()
    @IsString({ each: true })
    vldlCholesterolValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    tchoHdlRValue: Number;

    @IsOptional()
    @IsString({ each: true })
    tchoHdlRValueFlag: string | string[] | null;
}