import { Allow } from "class-validator";

export abstract class InvestigationBase {
    @Allow()
    id: string;
}