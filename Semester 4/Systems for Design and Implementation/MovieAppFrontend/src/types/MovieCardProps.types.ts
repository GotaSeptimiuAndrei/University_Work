import {Movie} from '../models/movie.ts';

export type MovieCardPropsType = {
    givenMovie: Movie;
    removeMethod: (movieId: number) => void;
};
