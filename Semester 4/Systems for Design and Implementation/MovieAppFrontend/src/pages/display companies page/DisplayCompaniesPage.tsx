import { useContext,  useState } from "react";
import { CompanyContext } from "../../contexts/CompanyContext.tsx";
import { Company } from "../../models/company.ts";
import { Layout } from "../../shared_components/layout/Layout";
import { Button } from "../../shared_components/button/Button";
import { CompanyCard } from "../../features/display companies/CompanyCard.tsx";
import './DisplayCompaniesPage.css';

export function DisplayCompaniesPage() {
    document.title = 'Display Companies';

    const companiesContext = useContext(CompanyContext)!;
    const allCompanies: Company[] = companiesContext.companies;
    const removeMethod = companiesContext.removeCompany;

    const [visibleCount, setVisibleCount] = useState<number>(4);
    
    return (
        <Layout>
            <div className='main-page-container'>
                <div className='all-companies' data-testid='companies-list'>
                    {allCompanies.slice(0, visibleCount).map((company) => (
                        <CompanyCard
                            givenCompany={company}
                            removeMethod={removeMethod}
                            key={company.getId()}
                        />
                    ))}
                </div>
                {visibleCount < allCompanies.length && (
                    <>
                    <Button
                        onClick={() => setVisibleCount(visibleCount + 4)}
                        buttonText='Load more'
                        type='button'
                        className='load-more-button'
                    />
                     <p>
                            Showing {visibleCount} out of {allCompanies.length}{' '}
                            movies
                    </p>
                    </>
                )}
            </div>
        </Layout>
    );
}
