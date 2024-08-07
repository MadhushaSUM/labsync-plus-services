import { InvestigationBase } from "../models/investigation/investigationBase";

export interface InvestigationData {
    investigation_registration_id: number;
    investigation_id: number;
    data: InvestigationBase;
}