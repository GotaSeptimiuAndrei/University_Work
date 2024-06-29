import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from "react-router-dom";
import {expect, test, vi} from "vitest";
import {MoviesContextProvider} from "../contexts/MovieContext.tsx";
import {Movie} from "../models/movie.ts";
import {DisplayMoviesPage} from "../pages/display movies page/DisplayMoviesPage.tsx";

test('test display movies page render', () => {
   render(
       <MoviesContextProvider movieContext={{
           movies: [new Movie(1, 'test title', 2024, 'test genre', 'test company', 'test image')],
           addMovie: vi.fn(),
           removeMovie: vi.fn(),
       }}>
           <BrowserRouter>
               <DisplayMoviesPage/>
           </BrowserRouter>
         </MoviesContextProvider>,
   )

    const movieListDiv = screen.getByTestId('movie-list');

   expect(movieListDiv.childNodes.length).toBe(1);
});