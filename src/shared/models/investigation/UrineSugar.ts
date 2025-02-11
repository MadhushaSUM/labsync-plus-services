import { IsNotEmpty, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class UrineSugar extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    urineSugar: string;
}