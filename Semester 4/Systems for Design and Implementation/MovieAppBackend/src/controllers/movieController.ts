import { Request, Response } from 'express';
import { MovieRepository } from '../repositories/movieRepository';
import { Movie } from '../models/movie';
import { MovieModel } from '../models/movieSchema';
import { CompanyModel } from '../models/companySchema';
import { UserModel } from "../models/userSchema";


export const movies = new MovieRepository();

export const getMovies = async (req: Request, res: Response) => {
    try{
        const page = parseInt(req.query.page as string) || 0;
        const allMovies = await movies.getMovies(page);
        res.json(allMovies);
    }
    catch(error){
        console.error('Error getting movies:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const movie = await MovieModel.findOne({ id: id });
    if (movie) {
        return res.status(200).json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
};

export const addMovie = async (req: Request, res: Response) => {
    try {
        const { title, year, genre, company, image } = req.body;
        const newMovie = new Movie(
            title,
            year,
            genre,
            company,
            image
        );
        movies.addMovie(newMovie);
        return res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error adding movie:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const movie = await MovieModel.findOne({ id: id });
    if (!movie) {
        res.status(404).send('Movie not found');
    } else {
        await movie.deleteOne();
        res.status(204).send();
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const movie: any = await MovieModel.findOne({ id: id });
    if (!movie) {
        res.status(404).send('Movie not found');
    } else {
        const newCompany = await CompanyModel.findOne({name: req.body.company});
        if (!newCompany) {
            const addCompany = new CompanyModel({ name: req.body.company });
            await addCompany.save();
        }

        const { title, year, genre, company, image } = req.body;
        movie.title = title;
        movie.year = year;
        movie.genre = genre;
        movie.company = company;
        movie.image = image;

        await movie.save();
        res.json(movie);
    }
}

export const getMoviesByUser = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 0;
    const pageSize = 10;
    const username = req.params.username;
    const user = await UserModel.findOne({ username: username});
    if (!user) {
        const allMovies = await movies.getMovies(page);
        res.json(allMovies);
    } else {
        const company = await CompanyModel.findOne({ company_id: user.company_id });
        if (!company) {
            res.status(404).send('Company not found');
        }
        else {
            const movies = await MovieModel.find({ company: company.name })
                .skip(page * pageSize)
                .limit(pageSize);
            if (movies.length > 0) {
                res.json(movies);
            } else {
                res.status(404).send('Movies not found');
            }
        }
    }
}