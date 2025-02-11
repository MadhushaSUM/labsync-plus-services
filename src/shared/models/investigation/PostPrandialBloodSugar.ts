import { IsNumber, IsOptional, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";


export class PostPrandialBloodSugar extends InvestigationBase {
    @IsOptional()
    @IsNumber()
    ppbsBfValue: Number;

    @IsOptional()
    @IsString({ each: true })
    ppbsBfValueFlag: string | string[] | null;
    
    @IsOptional()
    @IsNumber()
    ppbsLnValue: Number;
    
    @IsOptional()
    @IsString({ each: true })
    ppbsLnValueFlag: string | string[] | null;
    
    @IsOptional()
    @IsNumber()
    ppbsDnValue: Number;
    
    @IsOptional()
    @IsString({ each: true })
    ppbsDnValueFlag: string | string[] | null;
}