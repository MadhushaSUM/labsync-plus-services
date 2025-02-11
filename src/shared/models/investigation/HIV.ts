import { IsNotEmpty, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class HIV extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    hivAntigen: string;

    @IsNotEmpty()
    @IsString()
    hivAntibody: string;
}