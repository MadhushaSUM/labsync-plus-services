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
    fbsValue: number;

    @IsString()
    fbsValueFlag: string;
}