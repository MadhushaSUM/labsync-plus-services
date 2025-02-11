import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class SFR extends InvestigationBase {
    @IsString()
    @IsNotEmpty()
    colour: string;

    @IsString()
    @IsNotEmpty()
    appearance: string;

    @IsString()
    @IsNotEmpty()
    reducingSubs: string;

    @IsString()
    @IsNotEmpty()
    aoc: string;

    @IsString()
    @IsNotEmpty()
    redCells: string;

    @IsString()
    @IsNotEmpty()
    pusCells: string;

    @IsString()
    @IsNotEmpty()
    epithelialCells: string;

    @IsString()
    @IsNotEmpty()
    fatGlobules: string;

    @IsString()
    @IsNotEmpty()
    mucus: string;

    @IsString()
    @IsNotEmpty()
    vegFibrous: string;

    @IsString()
    @IsNotEmpty()
    yeast: string;
}
