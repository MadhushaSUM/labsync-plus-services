import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { InvestigationBase } from "./investigationBase";

export class BloodGroup extends InvestigationBase {
    @IsNotEmpty()
    @IsString({ each: true })
    bloodGroup: string | string[];
}