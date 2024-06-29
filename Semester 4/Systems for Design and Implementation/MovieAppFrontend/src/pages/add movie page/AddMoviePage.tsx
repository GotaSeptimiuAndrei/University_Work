import {useContext, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {MovieContext} from '../../contexts/MovieContext.tsx';
import {MovieForm} from "../../features/crud/Movie Form/MovieForm.tsx";
import {Movie} from '../../models/movie.ts';
import {Button} from '../../shared_components/button/Button';
import {Layout} from '../../shared_components/layout/Layout';
import axios from 'axios';
import React from 'react';
import { ServerStatusContext } from '../../App';

function handleOnClick(
    idInput : React.RefObject<HTMLInputElement>,
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
    const movieId = parseInt(idInput.current!.value);
    const movieTitle = titleInput.current!.value;
    const movieYear = parseInt(yearInput.current!.value);
    const movieGenre = genreInput.current!.value;
    const movieCompany = companyInput.current!.value;
    const movieImage = imageInput.current!.value;

    return new Movie(movieId, movieTitle, movieYear, movieGenre, movieCompany, movieImage);
}

export function AddMoviePage() {
    document.title = 'Add Movie';

    const idInput = useRef<HTMLInputElement>(null);
    const titleInput = useRef<HTMLInputElement>(null);
    const yearInput = useRef<HTMLInputElement>(null);
    const genreInput = useRef<HTMLInputElement>(null);
    const companyInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const movieContext = useContext(MovieContext)!;
    const isServerOnline = React.useContext(ServerStatusContext);

    useEffect(() => {
        if (idInput.current) {
            const maxId = Math.max(...movieContext.movies.map(movie => movie.getId()));
            const nextId = maxId + 1;
            idInput.current.value = nextId.toString();
        }
    }, []);

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
            
            if(isServerOnline){
                axios.post('http://13.50.108.50:5000/api/addMovie', inputMovie)
                .then(response => {
                    movieContext.addMovie(new Movie(response.data.id, response.data.title, response.data.year, response.data.genre, response.data.company, response.data.image));
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error adding movie:', error);
                });}
            else{
                movieContext.addMovie(inputMovie);
                const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
                pendingApiCalls.push({
                    method: 'POST',
                    url: 'http://13.50.108.50:5000/api/addMovie',
                    data: inputMovie
                });
                localStorage.setItem('pendingApiCalls', JSON.stringify(pendingApiCalls));
                navigate('/');
            }
        } catch (error) {
            console.error('Error handling input:', error);
        }
    };
    return (
        <Layout>
            <div className='main=page-container'>
                <div className='main-title'>Add Movie</div>

                <MovieForm
                    idInput={idInput}
                    titleInput={titleInput}
                    yearInput={yearInput}
                    genreInput={genreInput}
                    companyInput={companyInput}
                    imageInput={imageInput}
                />

                <Button
                    type='submit'
                    buttonText='Add Movie'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}
