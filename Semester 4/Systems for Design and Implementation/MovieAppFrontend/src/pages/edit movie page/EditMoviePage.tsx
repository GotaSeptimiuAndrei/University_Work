import {useContext, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {MovieContext} from '../../contexts/MovieContext.tsx';
import {MovieForm} from "../../features/crud/Movie Form/MovieForm.tsx";
import {Movie} from '../../models/movie.ts';
import {Button} from '../../shared_components/button/Button';
import {Layout} from '../../shared_components/layout/Layout';
import axios from 'axios';
import React from 'react';
import { ServerStatusContext } from '../../App';

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    titleInput: React.RefObject<HTMLInputElement>,
    yearInput: React.RefObject<HTMLInputElement>,
    genreInput: React.RefObject<HTMLInputElement>,
    companyInput: React.RefObject<HTMLInputElement>,
    imageInput: React.RefObject<HTMLInputElement>,
): Movie {
    if (
        !idInput.current ||
        !titleInput.current ||
        !yearInput.current ||
        !genreInput.current ||
        !companyInput.current ||
        !imageInput.current
    ) {
        throw new Error('Null references!');
    }
    if (
        !idInput.current!.value ||
        !titleInput.current!.value ||
        !yearInput.current!.value ||
        !genreInput.current!.value ||
        !companyInput.current!.value ||
        !imageInput.current!.value
    ) {
        throw new Error('All fields should be filled in!');
    }

    const movieID = parseInt(idInput.current!.value);
    const movieTitle = titleInput.current!.value;
    const movieYear = parseInt(yearInput.current!.value);
    const movieGenre = genreInput.current!.value;
    const movieCompany = companyInput.current!.value;
    const movieImage = imageInput.current!.value;

    return new Movie(movieID, movieTitle, movieYear, movieGenre, movieCompany, movieImage);
}

export function EditMoviePage() {
    document.title = 'Edit Movie';

    const idInput = useRef<HTMLInputElement>(null);
    const titleInput = useRef<HTMLInputElement>(null);
    const yearInput = useRef<HTMLInputElement>(null);
    const genreInput = useRef<HTMLInputElement>(null);
    const companyInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const movieContext = useContext(MovieContext)!;
    const isServerOnline = React.useContext(ServerStatusContext);

    const {movieId} = useParams();
    if (!movieId) {
        navigate('/');
        return;
    }

    const givenMovie = movieContext.movies.find(
        (movie: Movie) => movie.getId() === parseInt(movieId),
    );

    const handleOnClickWrapper = () => {
        try {
            const inputMovie = handleOnClick(
                idInput,
                titleInput,
                yearInput,
                genreInput,
                companyInput,
                imageInput,
            );
            if (isServerOnline)
                {axios.put(`http://13.50.108.50:5000/api/movies/${inputMovie.getId()}`, inputMovie)
                    .then(response => {
                        movieContext.removeMovie(inputMovie.getId());
                        movieContext.addMovie(new Movie(
                            response.data.id,
                            response.data.title,
                            response.data.year,
                            response.data.genre,
                            response.data.company,
                            response.data.image
                        ));
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error updating movie:', error);
                    });}
            else{
                movieContext.removeMovie(inputMovie.getId());
                movieContext.addMovie(inputMovie);

                const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
                pendingApiCalls.push({
                    method: 'PUT',
                    url: `http://13.50.108.50:5000/api/movies/${inputMovie.getId()}`,
                    data: inputMovie
                });
                localStorage.setItem('pendingApiCalls', JSON.stringify(pendingApiCalls));
                navigate('/');
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <Layout>
            <div className='main=page-container'>
                <MovieForm
                    idInput={idInput}
                    titleInput={titleInput}
                    yearInput={yearInput}
                    genreInput={genreInput}
                    companyInput={companyInput}
                    imageInput={imageInput}
                    givenMovie={givenMovie}
                />

                <Button
                    type='submit'
                    buttonText='Edit Movie'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}
