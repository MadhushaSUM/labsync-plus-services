import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
    Max,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class FastingBloodSugar extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    @Min(100)
    @Max(200)
    fbsValue: number;

    @IsString()
    fbsValueFlag: string;
}