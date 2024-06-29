import '@testing-library/jest-dom';
import {fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {expect, test, vi} from "vitest";
import {MovieCard} from "../features/display movies/MovieCard";
import {Movie} from "../models/movie.ts";

const {mockedUseNavigate} = vi.hoisted(() => {
    return {
        mockedUseNavigate: vi.fn(),
    };
});

vi.mock('react-router-dom', async () => {
    const router =
        await vi.importActual<typeof import('react-router-dom')>(
            'react-router-dom',
        );
    return {
        ...router,
        useNavigate: () => mockedUseNavigate,
    };
});

test('test movie card rendering', () => {
    const testMovie = new Movie(1, 'test title', 2024, 'test genre', 'test company', 'test image');
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <MovieCard givenMovie={testMovie} removeMethod={mockRemoveMethod}/>
        </BrowserRouter>,
    );

    const movieCard = screen.getByTestId('movie-card');
    const removeButton = screen.getByTestId('remove-button');

    const movieId = screen.getByTestId('ID: 1');
    const movieTitle = screen.getByTestId('Title: test title');
    const movieYear = screen.getByTestId('Year: 2024');
    const movieGenre = screen.getByTestId('Genre: test genre');
    const movieCompany = screen.getByTestId('Company: test company');
    const movieImage = screen.getByAltText('movie image');

    expect(movieCard).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(movieId).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(movieYear).toBeInTheDocument();
    expect(movieGenre).toBeInTheDocument();
    expect(movieCompany).toBeInTheDocument();
    expect(movieImage).toBeInTheDocument();
});

test('test movie card remove method to be called', () => {
    const testMovie = new Movie(1, 'test title', 2024, 'test genre', 'test company', 'test image');
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <MovieCard givenMovie={testMovie} removeMethod={mockRemoveMethod}/>
        </BrowserRouter>,
    );

    const movieCard = screen.getByTestId('movie-card');
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    fireEvent.click(movieCard);

    expect(mockRemoveMethod.mock.calls.length).toBe(1);
    expect(mockedUseNavigate).toBeCalledWith('/editMovie/1');
});