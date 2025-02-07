export interface Test {
    id: number;
    name: string;
    code: string;
    price: number;
    version: number;
}

export interface TestField {
    id: number;
    test_id: number;
    name: string;
    code: string;
    vestion: number;
}

export interface NormalRange {
    id: number;
    test_id: number;
    test_field_id: number;
    rules: object[];
    version: number;
}