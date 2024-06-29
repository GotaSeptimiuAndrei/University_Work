import { UserModel } from "../models/userSchema";
import { Request, Response } from "express";
import { CompanyModel } from "../models/companySchema";
import jwt from "jsonwebtoken";

export const validateLogin = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({username: username, password: password});
        if (!user) {
            return res.status(401).json({message: "Invalid username or password"});
        }
        const token = jwt.sign({username}, "key", {expiresIn: "10m"});
        return res.status(200).json({message: "Login successful", token});
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

// If companyName exists, take the company_id from the database
// If companyName does not exist, create a new company and take the company_id
export const validateRegister = async (req: Request, res: Response) => {
    const {username, password, companyName} = req.body;

    try {
        const company = await CompanyModel
            .findOne({name: companyName})
            .select("company_id");
        let company_id;
        if (company) {
            company_id = company.company_id;
        } else {
            const newCompany = new CompanyModel({name: companyName});
            await newCompany.save();
            company_id = newCompany.company_id;
        }
        const user = await UserModel.findOne({username: username});
        if (user) {
            return res.status(400).json({message: "Username already exists"});
        }
        const newUser = new UserModel({company_id, username, password});
        await newUser.save();
        return res.status(201).json({message: "User created"});
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({message: "Internal server error"});
    }
};