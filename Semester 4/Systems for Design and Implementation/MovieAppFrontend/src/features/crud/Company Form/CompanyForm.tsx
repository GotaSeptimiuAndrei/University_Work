import { Company } from "../../../models/company.ts";
import { CompanyFormProps } from "../../../types/CompanyFormProps.types.ts";
import { FormDataEntry } from "../Form Entry/FormEntry.tsx";
import React from "react";

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeholder: string;
    defaultValue: string;
    disabled: boolean;
};

function setFormEntriesForCompany(
    formEntries: FormEntryType[],
    givenCompany: Company | undefined,
) {
    if (givenCompany !== undefined) {
        formEntries[0].disabled = true;
        formEntries[0].defaultValue = givenCompany.getId().toString();
        formEntries[1].defaultValue = givenCompany.getName();
    }

    return formEntries;
}

function createFormEntries(props: CompanyFormProps) {
    let formEntries = [
        {
            label: 'ID',
            ref: props.idInput,
            placeholder: 'ID',
            defaultValue: '',
            disabled: true,
        },
        {
            label: 'Name',
            ref: props.nameInput,
            placeholder: 'Name',
            defaultValue: '',
            disabled: false,
        },
    ];

    formEntries = setFormEntriesForCompany(formEntries, props.givenCompany);
    return formEntries;
}

export function CompanyForm(props: CompanyFormProps) {
    const formEntries = createFormEntries(props);

    return (
        <div className='form' data-testid='movie-form'>
            <form className="movie-form">
                {formEntries.map((entry) => (
                    <FormDataEntry
                        key={entry.label}
                        label={entry.label}
                        ref={entry.ref}
                        placeholder={entry.placeholder}
                        defaultValue={entry.defaultValue}
                        disabled={entry.disabled}
                    />
                ))}
            </form>
        </div>
    );
}