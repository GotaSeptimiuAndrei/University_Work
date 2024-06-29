import {
    addCompany,
    deleteCompany,
    getCompanies,
    getCompanyById,
    getMoviesByCompany,
    updateCompany, getCompaniesUnregistered,
} from "./controllers/companyController";
import {
    addMovie,
    deleteMovie,
    getMovieById,
    getMovies, getMoviesByUser,
    updateMovie
} from "./controllers/movieController";
import { Router } from "express";
import {ro} from "@faker-js/faker";
import {validateLogin, validateRegister} from "./controllers/registerController";

const router = Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getMovieById);
router.get('/moviesof/:username', getMoviesByUser);
router.post('/addMovie', addMovie);
router.delete('/movies/:id', deleteMovie);
router.put('/movies/:id', updateMovie);

router.get('/companies', getCompanies);
router.get('/moviesfor/:companyid', getMoviesByCompany);
router.get('/companies/:id', getCompanyById);
router.post('/addCompany', addCompany);
router.delete('/companies/:id', deleteCompany);
router.put('/companies/:id', updateCompany);
router.get('/companiesUnregistered', getCompaniesUnregistered);

router.post('/register', validateRegister);
router.post('/login', validateLogin);


export default router;
