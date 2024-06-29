import React, { useContext, useRef } from "react";
import { Company } from "../../models/company.ts";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyContext } from "../../contexts/CompanyContext.tsx";
import axios from "axios";
import { Layout } from "../../shared_components/layout/Layout";
import {CompanyForm} from "../../features/crud/Company Form/CompanyForm.tsx";
import { Button } from "../../shared_components/button/Button";

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
): Company {
    if (
        !idInput.current ||
        !nameInput.current
    ) {
        throw new Error('Null references!');
    }
    if (
        !idInput.current!.value ||
        !nameInput.current!.value
    ) {
        throw new Error('All fields should be filled in!');
    }
    const companyId = parseInt(idInput.current!.value);
    const companyName = nameInput.current!.value;

    return new Company(companyId, companyName);
}

export function EditCompanyPage() {
    document.title = 'Edit Company';

    const idInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const companyContext = useContext(CompanyContext)!;

    const {companyId} = useParams();
    if (!companyId) {
        navigate('/companies');
        return;
    }

    const givenCompany = companyContext.companies.find(
        (company: Company) => company.getId() === parseInt(companyId),
    );

    const handleOnClickWrapper = () => {
        try {
            const inputCompany = handleOnClick(
                idInput,
                nameInput,
            );

            axios.put(`http://13.50.108.50:5000/api/companies/${inputCompany.getId()}`, inputCompany)
                .then(response => {
                    companyContext.removeCompany(response.data);
                    companyContext.addCompany(new Company(response.data.id, response.data.name));
                    navigate('/companies');
                })
                .catch(error => {
                    console.error('Error updating company:', error);
                });
        } catch (error) {
            console.error('Error handling input:', error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <div className="main-title">Edit Company</div>

                <CompanyForm
                    idInput={idInput}
                    nameInput={nameInput}
                    givenCompany={givenCompany}
                />

            
                <Button
                    type='submit'
                    buttonText="Edit Company"
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}