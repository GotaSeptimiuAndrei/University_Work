import {IMovie, MovieModel} from '../models/movieSchema';
import {CompanyModel} from '../models/companySchema';


const movieTitles = [
    'The Godfather',
    'Raging Bull',
    'Casablanca',
    'Citizen Kane',
    'Gone with the Wind',
    'The Wizard of Oz',
    'Lawrence of Arabia',
    'Vertigo',
    'Psycho',
    'The Godfather Part II',
    'On the Waterfront',
    'Sunset Boulevard',
    'Forrest Gump',
    'The Sound of Music',
];

const movieGenres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Thriller',
];


export class MovieRepository{
    public async addMovie(movieData: any): Promise<IMovie> {
        const company = await CompanyModel.findOne({name: movieData.company});
        if (!company) {
            throw new Error('Nonexistent company');
        }
        const movie =  new MovieModel(movieData);
        const savedMovie = await movie.save();
        return savedMovie;
    }

    public async createMovie(): Promise<IMovie> {

        const count = await CompanyModel.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const existingCompany = await CompanyModel.findOne().skip(randomIndex);

        const title = movieTitles[Math.floor(Math.random() * movieTitles.length)];
        const year = Math.floor(Math.random() * 100) + 1920;
        const genre = movieGenres[Math.floor(Math.random() * movieGenres.length)];
        const company = existingCompany?.name;
        const image = `https://source.unsplash.com/300x300/?${title}`;
        
        const movieData = {
            title: title,
            year: year,
            genre: genre,
            company: company,
            image: image
        };
    
        const movie =  new MovieModel(movieData);
        const savedMovie = await movie.save();
        return savedMovie;
    }

    public async getMovies(page: number): Promise<IMovie[]> {
        try {
            const pageSize = 50;
            const skip = page * pageSize;
            const movies = await MovieModel.find({})
                                                                         .skip(skip)
                                                                         .limit(pageSize);
            return movies;
        } catch (error) {
            console.error('Error getting movies:', error);
            return [];
        }
    }
}

