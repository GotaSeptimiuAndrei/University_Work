import { createContext } from "react";
import { CompanyContextType, CompanyProviderType } from "../types/CompanyContextTypes.types.ts";

export const CompanyContext = createContext<CompanyContextType | null>(null);

function CompanyContextProvider({companyContext, children}: CompanyProviderType) {
    return (
        <CompanyContext.Provider value={companyContext}>
            {children}
        </CompanyContext.Provider>
    );
}

export {CompanyContextProvider};