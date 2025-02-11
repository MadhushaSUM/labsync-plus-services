import { IsNotEmpty, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class UrineHCG extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    hcg: string;
}