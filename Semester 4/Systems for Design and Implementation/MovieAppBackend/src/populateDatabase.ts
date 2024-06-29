import { CompanyRepository } from "./repositories/companyRepository";
import { MovieRepository } from "./repositories/movieRepository";

export async function populateDatabase(moviesRepository: MovieRepository,
                                        companiesRepository: CompanyRepository ) {
    for (let i = 0; i < 10; i++) {
        const company = await companiesRepository.createCompany();
        companiesRepository.addCompany(company);
        //console.log("#" + i.toString() + " " + company.name.toString() + " added\n");
    }

    for (let i = 0; i < 500; i++) {
        const movie = await moviesRepository.createMovie();
        moviesRepository.addMovie(movie);
        //console.log("#" +  i.toString() + " " + movie.title.toString() + " added for company " + movie.company.toString() + "\n");
    }
}
