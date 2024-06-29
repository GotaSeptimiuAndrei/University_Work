import { Company } from "../models/company.ts";
import React from "react";

export type CompanyContextType = {
    companies: Company[];
    addCompany: (company: Company) => void;
    removeCompany: (companyId: number) => void;
};

export type CompanyProviderType = {
    companyContext: CompanyContextType;
    children: React.ReactNode;
};