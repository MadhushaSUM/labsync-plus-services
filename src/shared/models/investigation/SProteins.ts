import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class SProteins extends InvestigationBase {
    @IsNumber()
    @IsNotEmpty()
    totalProteinsValue: number;

    @IsOptional()
    @IsString({ each: true })
    totalProteinsValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    albuminValue: number;

    @IsOptional()
    @IsString({ each: true })
    albuminValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    globulinValue: number;

    @IsOptional()
    @IsString({ each: true })
    globulinValueFlag: string | string[] | null;

    @IsNumber()
    @IsNotEmpty()
    agRatioValue: number;
}
