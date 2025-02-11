import { IsNotEmpty, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class UFR extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    colour: string;

    @IsNotEmpty()
    @IsString()
    appearance: string;

    @IsNotEmpty()
    @IsString()
    reaction: string;

    @IsNotEmpty()
    @IsString()
    albumin: string;

    @IsNotEmpty()
    @IsString()
    reducingSubs: string;

    @IsNotEmpty()
    @IsString()
    bile: string;

    @IsNotEmpty()
    @IsString()
    urobilinogen: string;

    @IsNotEmpty()
    @IsString()
    pusCells: string;

    @IsNotEmpty()
    @IsString()
    redCells: string;

    @IsNotEmpty()
    @IsString()
    epithelialCells: string;

    @IsNotEmpty()
    @IsString()
    casts: string;

    @IsNotEmpty()
    @IsString()
    crystals: string;

    @IsNotEmpty()
    @IsString()
    organisms: string;
}