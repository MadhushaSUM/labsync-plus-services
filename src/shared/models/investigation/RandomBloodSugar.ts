import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
  } from 'class-validator';
  import { InvestigationBase } from "./investigationBase";
  
  export class RandomBloodSugar extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    rbsValue: number;

    @IsString()
    time: string;
  
    @IsOptional()
    @IsString({ each: true })
    rbsValueFlag: string | string[] | null;
  }