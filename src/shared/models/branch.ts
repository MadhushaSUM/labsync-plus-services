import { BranchType } from "../types/branch";

export function validateBranch(branch: any) {
    if (
        // !patient.id ||
        !branch.name ||
        !branch.version
    ) {
        throw new Error('Invalid branch data');
    }

    const verifiedBranch: BranchType = {
        // id: branch.id,
        name: branch.name,
        address: branch.address,
        telephone: branch.telephone,
        version: branch.version,
    }

    return verifiedBranch;
}
