import {Movie} from '../models/movie.ts';
import React from "react";

export type MovieFormProps = {
    idInput: React.RefObject<HTMLInputElement>;
    titleInput: React.RefObject<HTMLInputElement>;
    yearInput: React.RefObject<HTMLInputElement>;
    genreInput: React.RefObject<HTMLInputElement>;
    companyInput: React.RefObject<HTMLInputElement>;
    imageInput: React.RefObject<HTMLInputElement>;
    givenMovie?: Movie;
};
