import {faker} from "@faker-js/faker";
import {ICompany, CompanyModel} from "../models/companySchema";

export class CompanyRepository {
    public async getCompanies(): Promise<ICompany[]> {
        try {
            const companies = await CompanyModel.find({});
            return companies;
        } catch (error) {
            console.error('Error getting companies:', error);
            return [];
        }
    }

    public async addCompany(companyData: any): Promise<ICompany> {
        const company = new CompanyModel(companyData);
        const savedCompany = await company.save();
        return savedCompany;
    }

    public async createCompany(): Promise<ICompany> {
        const name = faker.company.name();
        const companyData = {
            name: name
        };
        const company = new CompanyModel(companyData);
        const savedCompany = await company.save();
        return savedCompany;
    }
}