import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
  } from 'class-validator';
  import { InvestigationBase } from "./investigationBase";
  
  export class FastingBloodSugar extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    fbsValue: number;
  
    @IsOptional()
    @IsString({ each: true })
    fbsValueFlag: string | string[] | null;
  }