import { IsNotEmpty, IsString } from "class-validator";
import { InvestigationBase } from "./investigationBase";

export class DengueTest extends InvestigationBase {
    @IsNotEmpty()
    @IsString()
    dengue: string;
}