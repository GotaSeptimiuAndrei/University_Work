import {Movie} from '../models/movie.ts';
import React from "react";

export type MovieContextType = {
    movies: Movie[];
    addMovie: (movie: Movie) => void;
    removeMovie: (movieId: number) => void;
};

export type MovieProviderType = {
    movieContext: MovieContextType;
    children: React.ReactNode;
};
