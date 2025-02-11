import { IsNotEmpty, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class CardiacTroponinT extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    ctnt: string;
}
