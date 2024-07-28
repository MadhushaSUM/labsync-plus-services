export interface InvestigationRegistrationType {
    id: string;
    date: string;
    patient_id: string;
    doctor_id: string;
    investigations: string[];
    data_added_investigations: string[];
    cost: number;
    is_confirmed: boolean;
    // branch_id: string;
}