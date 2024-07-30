import { InvestigationBase } from "../models/investigation/investigationBase";

export interface InvestigationData {
    id: string;
    investigation_registration_id: string;
    investigation_id: string;
    data: InvestigationBase;
}