import { Request, Response } from 'express';
import {CompanyModel} from "../models/companySchema";
import {MovieModel} from "../models/movieSchema";
import { Company } from '../models/company';
import { CompanyRepository } from '../repositories/companyRepository';
import {UserModel} from "../models/userSchema";


export const companies = new CompanyRepository();

export const getCompanies = async (req: Request, res: Response) => {
    try {
        const allCompanies = await companies.getCompanies();
        res.json(allCompanies);
    } catch (error) {
        console.error('Error getting companies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMoviesByCompany = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 15;
    const company_id = req.params.companyid;
    const company = await CompanyModel.findOne({ company_id: company_id });
    if (!company) {
        res.status(404).send('Company not found');
    } else {
        const movies = await MovieModel.find({ company: company.name })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        if (movies.length > 0) {
            res.json(movies);
        } else {
            res.status(404).send('Movies not found');
        }
    }
}

export const getCompanyById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const company = await CompanyModel.findOne({ company_id: id });
    if (company) {
        res.status(200).json(company);
    } else {
        res.status(404).send('Company not found');
    }
};

export const addCompany = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newCompany = new Company(name);
        companies.addCompany(newCompany);
        return res.status(201).json(newCompany);
    } catch (error) {
        console.error('Error adding company:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const deleteCompany = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const company = await CompanyModel.findOne({ company_id: id });
    if (!company) {
        res.status(404).send('Company not found');
    } else {
        await company.deleteOne();
        res.status(204).send();
    }
}

export const updateCompany = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const company: any = await CompanyModel.findOne({ company_id: id });
    if (!company) {
        res.status(404).send('Company not found');
    } else {
        const { name } = req.body;
        company.name = name;

        await company.save();
        res.json(company);
    }
}

export const getCompaniesUnregistered = async (req: Request, res: Response) => {
    const userDataCompanies = (await UserModel.distinct('company_id')).map(id => id.toString());
    const companiesNotInUserData = await CompanyModel.find({ company_id: { $nin: userDataCompanies } });
    res.json(companiesNotInUserData);
}