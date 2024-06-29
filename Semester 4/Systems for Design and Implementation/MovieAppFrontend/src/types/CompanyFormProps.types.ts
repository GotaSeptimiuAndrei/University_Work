import { Company } from "../models/company.ts";
import React from "react";

export type CompanyFormProps = {
    idInput: React.RefObject<HTMLInputElement>;
    nameInput: React.RefObject<HTMLInputElement>;
    givenCompany?: Company;
};