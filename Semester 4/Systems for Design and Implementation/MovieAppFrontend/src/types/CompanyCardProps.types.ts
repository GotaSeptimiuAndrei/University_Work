import { Company } from "../models/company.ts";

export type CompanyCardPropsType = {
    givenCompany: Company;
    removeMethod: (companyId: number) => void;
};