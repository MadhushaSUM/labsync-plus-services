import { Allow, IsOptional, IsString } from "class-validator";

export abstract class InvestigationBase {
    @Allow()
    id: string;
    @IsOptional()
    @IsString()
    comment: string;
}