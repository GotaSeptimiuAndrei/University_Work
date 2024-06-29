import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import React from 'react';
import {expect, test} from "vitest";
import {MovieForm} from "../features/crud/Movie Form/MovieForm.tsx";
import {Movie} from '../models/movie.ts';

test('testing rendering of movie form without movie', () => {
    const idInput = React.createRef<HTMLInputElement>();
    const titleInput = React.createRef<HTMLInputElement>();
    const yearInput = React.createRef<HTMLInputElement>();
    const genreInput = React.createRef<HTMLInputElement>();
    const companyInput = React.createRef<HTMLInputElement>();
    const imageInput = React.createRef<HTMLInputElement>();

    render(
        <MovieForm
            idInput={idInput}
            titleInput={titleInput}
            yearInput={yearInput}
            genreInput={genreInput}
            companyInput={companyInput}
            imageInput={imageInput}
        />,
    );

    const renderedMovieForm = screen.getByTestId('movie-form');
    const idFormInput = screen.getByTestId('ID');
    const titleFormInput = screen.getByTestId('Title');
    const yearFormInput = screen.getByTestId('Year');
    const genreFormInput = screen.getByTestId('Genre');
    const companyFormInput = screen.getByTestId('Company');
    const imageFormInput = screen.getByTestId('Image');

    expect(renderedMovieForm).toBeInTheDocument();
    expect(idFormInput).toBeInTheDocument();
    expect(titleFormInput).toBeInTheDocument();
    expect(yearFormInput).toBeInTheDocument();
    expect(genreFormInput).toBeInTheDocument();
    expect(companyFormInput).toBeInTheDocument();
    expect(imageFormInput).toBeInTheDocument();
});

test('testing rendering of movie form with movie', () => {
    const idInput = React.createRef<HTMLInputElement>();
    const titleInput = React.createRef<HTMLInputElement>();
    const yearInput = React.createRef<HTMLInputElement>();
    const genreInput = React.createRef<HTMLInputElement>();
    const companyInput = React.createRef<HTMLInputElement>();
    const imageInput = React.createRef<HTMLInputElement>();

    const givenMovie = new Movie(1, 'test title', 2024, 'test genre', 'test company', 'test image');

    render(
        <MovieForm
            idInput={idInput}
            titleInput={titleInput}
            yearInput={yearInput}
            genreInput={genreInput}
            companyInput={companyInput}
            imageInput={imageInput}
            givenMovie={givenMovie}
        />,
    );

    const renderedMovieForm = screen.getByTestId('movie-form');
    const idFormInput = screen.getByTestId('ID');
    const titleFormInput = screen.getByTestId('Title');
    const yearFormInput = screen.getByTestId('Year');
    const genreFormInput = screen.getByTestId('Genre');
    const companyFormInput = screen.getByTestId('Company');
    const imageFormInput = screen.getByTestId('Image');

    expect(renderedMovieForm).toBeInTheDocument();
    expect(idFormInput).toBeInTheDocument();
    expect(titleFormInput).toBeInTheDocument();
    expect(yearFormInput).toBeInTheDocument();
    expect(genreFormInput).toBeInTheDocument();
    expect(companyFormInput).toBeInTheDocument();
    expect(imageFormInput).toBeInTheDocument();
});



