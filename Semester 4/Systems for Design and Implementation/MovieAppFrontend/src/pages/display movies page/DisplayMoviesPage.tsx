import {useContext, useEffect, useState} from 'react';
import {MovieContext} from '../../contexts/MovieContext.tsx';
import {MovieCard} from '../../features/display movies/MovieCard.tsx';
import {Movie} from '../../models/movie.ts';
import {Button} from '../../shared_components/button/Button';
import {Layout} from '../../shared_components/layout/Layout';
import './DisplayMoviesPage.css';
import React from 'react';
import axios from 'axios';
import {AuthContext} from "../login page/LoginPage.tsx";

export function DisplayMoviesPage() {
    document.title = 'Display Movies';

    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [isAscendingById, setIsAscendingById] = useState<boolean>(true);
    const auth = useContext(AuthContext);

    const moviesContext = useContext(MovieContext)!;

    const allMovies: Movie[] = moviesContext.movies;
    const removeMethod = moviesContext.removeMovie;

    useEffect(() => {
        allMovies.sort((firstMovie, secondMovie) => {
            return firstMovie.getYear() - secondMovie.getYear();
        });
        if (!isAscending) allMovies.reverse();
    }, [isAscending]);

    useEffect(() => {
        allMovies.sort((a, b) => (a.getId() > b.getId() ? 1 : -1));
        if (!isAscendingById) allMovies.reverse();
    }, [isAscendingById]);

    const [page, setPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
            if (scrollBottom < 100 && !isLoading) { 
                loadMoreData();
            }
        };
    
        const debounce = (func: any, delay: number) => {
            let timer: ReturnType<typeof setTimeout>;
            return function (this: any) {
                const context = this;
                const args = arguments;
                clearTimeout(timer);
                timer = setTimeout(() => func.apply(context, args), delay);
            };
        };
    
        const debouncedScrollHandler = debounce(handleScroll, 1000);
    
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => window.removeEventListener('scroll', debouncedScrollHandler);
    }, [isLoading, auth]);
    
    const [fetchedMoviesIds, setFetchedMoviesIds] = React.useState<number[]>([]);

    const loadMoreData = async () => {
        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const username = localStorage.getItem('username');
            axios.get(`http://13.50.108.50:5000/api/moviesof/${username}?page=${nextPage}`)
                .then((response) => {
                    console.log('Next page of movies fetched:', response.data);
                    const newMovies = response.data.map((movieData: any) => new Movie(movieData.id, movieData.title, movieData.year, movieData.genre, movieData.company, movieData.image));

                    const filteredNewMovies = newMovies.filter((movie: Movie) => !fetchedMoviesIds.includes(movie.getId()));

                    setFetchedMoviesIds([...fetchedMoviesIds, ...filteredNewMovies.map((movie: Movie) => movie.getId())]);
                    filteredNewMovies.forEach((movie: Movie) => {
                        moviesContext.addMovie(movie);
                    });
                    
                    setPage(nextPage);
                })
                .catch((error) => {
                    console.error('Error fetching next page of movies:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
          console.error('Error fetching next page of movies:', error);
        }
      };

    return (
        <Layout>
            <div className='main-page-container'>
                <Button
                    onClick={() => setIsAscendingById(!isAscendingById)}
                    buttonText={`Sort ${isAscendingById ? 'ascending' : 'descending'} by ID`}
                    type='button'
                    className='sort-button'
                />

                <Button
                    onClick={() => setIsAscending(!isAscending)}
                    buttonText={`Sort ${isAscending ? 'ascending' : 'descending'} by year`}
                    type='button'
                    className='sort-button'
                />

                <div className='all-movies' data-testid='movies-list'>
                {allMovies.map((movie) => (
                        <MovieCard
                            givenMovie={movie}
                            removeMethod={removeMethod}
                            key={movie.getId()}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
