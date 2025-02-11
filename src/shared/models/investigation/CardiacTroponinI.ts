import { IsNotEmpty, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class CardiacTroponinI extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    ctni: string;
}
