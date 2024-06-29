import React, { useContext, useEffect, useRef } from "react";
import { Company } from "../../models/company.ts";
import { useNavigate } from "react-router-dom";
import { CompanyContext } from "../../contexts/CompanyContext.tsx";
import axios from "axios";
import { Layout } from "../../shared_components/layout/Layout";
import { Button } from "../../shared_components/button/Button";
import {CompanyForm} from "../../features/crud/Company Form/CompanyForm.tsx";

function handleOnClick(
    idInput : React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,    
): Company {
    if (!idInput.current ||
        !nameInput.current) 
    {
        throw new Error('Null references!');
    }
    const companyId = parseInt(idInput.current!.value);
    const companyName = nameInput.current!.value;
    
    console.log(companyId, companyName);
    return new Company(companyId, companyName);
}

export function AddCompanyPage() {
    document.title = 'Add Company';

    const idInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();
    const companyContext = useContext(CompanyContext)!;

    useEffect(() => {
        if (idInput.current) {
            const maxId = Math.max(...companyContext.companies.map(company => company.getId()));
            const nextId = maxId + 1;
            idInput.current.value = nextId.toString();
        }
    }, []);

    const handleOnClickWrapper = () => {
        try {
            const inputCompany = handleOnClick(
                idInput,
                nameInput,
            );

            axios.post('http://13.50.108.50:5000/api/addCompany', inputCompany)
                .then(response=> {
                    const companyData = response.data;
                    const newCompany = new Company(companyData.company_id, companyData.name);
                    companyContext.addCompany(newCompany);
                    navigate('/companies');
            })
            .catch(error => {
                console.log(inputCompany);
                console.error('Error adding company:', error);
            });
    } catch (error) {
        console.error('Error handling input:', error);
    }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <div className="main-title">Add Company</div>

                <CompanyForm
                    idInput={idInput}
                    nameInput={nameInput}
                />

                <Button
                    type='submit'
                    buttonText='Add Company'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}