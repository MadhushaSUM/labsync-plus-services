export interface InvestigationRegistrationType {
    id?: number;
    date: string;
    patient_id: string;
    doctor_id: string;
    investigations: number[];
    data_added_investigations: number[];
    cost: number;
    is_confirmed: boolean;
    // branch_id: string;
}