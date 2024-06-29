import {Movie} from '../../../models/movie.ts';
import {MovieFormProps} from '../../../types/MovieFormProps.types.ts';
import {FormDataEntry} from '../Form Entry/FormEntry.tsx';
import React from "react";

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeholder: string;
    defaultValue: string;
    disabled: boolean;
};

function setFormEntriesForMovie(
    formEntries: FormEntryType[],
    givenMovie: Movie | undefined,
) {
    if (givenMovie !== undefined) {
        formEntries[0].disabled = true;
        formEntries[0].defaultValue = givenMovie.getId().toString();
        formEntries[1].defaultValue = givenMovie.getTitle();
        formEntries[2].defaultValue = givenMovie.getYear().toString();
        formEntries[3].defaultValue = givenMovie.getGenre();
        formEntries[4].defaultValue = givenMovie.getCompany();
        formEntries[5].defaultValue = givenMovie.getImage();
    }

    return formEntries;
}

function createFormEntries(props: MovieFormProps) {
    let formEntries = [
        {
            label: 'ID',
            ref: props.idInput,
            placeholder: 'ID',
            defaultValue: '',
            disabled: true,
        },
        {
            label: 'Title',
            ref: props.titleInput,
            placeholder: 'Title',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Year',
            ref: props.yearInput,
            placeholder: 'Year',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Genre',
            ref: props.genreInput,
            placeholder: 'Genre',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Company',
            ref: props.companyInput,
            placeholder: 'Company',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Image',
            ref: props.imageInput,
            placeholder: 'Image',
            defaultValue: '',
            disabled: false,
        }
    ];
    formEntries = setFormEntriesForMovie(formEntries, props.givenMovie);
    return formEntries;
}

export function MovieForm(props: MovieFormProps) {
    const formEntries = createFormEntries(props);
    return (
        <div className='form' data-testid='movie-form'>
            <form className='movie-form'>
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
