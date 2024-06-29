import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MoviesContextProvider} from './contexts/MovieContext.tsx';
import {Movie} from './models/movie.ts';
import './App.css';
import {AddMoviePage} from './pages/add movie page/AddMoviePage.tsx';
import ChartPage from "./pages/chart page/ChartPage.tsx";
import {EditMoviePage} from './pages/edit movie page/EditMoviePage.tsx';
import axios from 'axios';
import { io } from 'socket.io-client';
import Alert from '@mui/material/Alert';
import { Company } from './models/company.ts';
import { CompanyContextProvider} from './contexts/CompanyContext.tsx';
import { DisplayMoviesPage } from './pages/display movies page/DisplayMoviesPage.tsx';
import { DisplayCompaniesPage } from './pages/display companies page/DisplayCompaniesPage.tsx';
import { AddCompanyPage } from './pages/add company page/AddCompanyPage.tsx';
import { EditCompanyPage } from './pages/edit company page/EditCompanyPage.tsx';
import { ApiCall } from './models/apiCall';
import LoginPage, {AuthContext} from "./pages/login page/LoginPage.tsx";
import RegisterPage from "./pages/register page/RegisterPage.tsx";


export const ServerStatusContext = createContext<boolean>(true);

function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isServerOnline, setIsServerOnline] = useState(true);
    const isAuthenticated = React.useContext(AuthContext);

    const page = 0;

    useEffect(() => {
        const socket = io('http://13.50.108.50:5000', { transports : ['websocket'] });
        socket.on('newMovie', (newMovie: any) => {
          console.log('Received new movie from server:', newMovie);
        });

        socket.on('connect_error', () => {
            setIsServerOnline(false);
        });

        return () => {
          socket.close();
        }

      }, []);
    
      useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));
    
        return () => {
          window.removeEventListener('online', () => setIsOnline(true));
          window.removeEventListener('offline', () => setIsOnline(false));
        };
      }, []);

    const fetchMovies = async () => {
        const username = localStorage.getItem('username');
        axios.get(`http://13.50.108.50:5000/api/moviesof/${username}?page=${page}`)
            .then(response => {
                const movies = response.data.map((movieData: any) => new Movie(movieData.id, movieData.title, movieData.year, movieData.genre, movieData.company, movieData.image));
                if (page == 0)
                    setMovies(movies);
                else
                    setMovies(prevState => [...prevState, ...movies]);
                localStorage.setItem('movies', JSON.stringify(movies));
                setIsServerOnline(true);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
                const movies = storedMovies.map((movie: any) => new Movie(movie.id, movie.title, movie.year, movie.genre, movie.company, movie.image));
                setMovies(movies);
                setIsServerOnline(false);
            });
    }

    const fetchCompanies = () => {
        axios.get("http://13.50.108.50:5000/api/companies")
            .then(response => {
                console.log('Companies:', response.data);
                const companies = response.data.map((company: any) => new Company(company.company_id, company.name));
                setCompanies(companies);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
                setIsServerOnline(false);
            });
    }

    useEffect(() => {
        fetchMovies();
        fetchCompanies();
    }, [isServerOnline, isAuthenticated]);

    console.log('Movies:', movies);
    console.log('Companies:', companies);
    
    const addMovie = (newMovie: Movie) => {
        setMovies(prevState => [...prevState, newMovie]);
    };

    const removeMovie = (movieId: number) => {
        setMovies((prevState: Movie[]) =>
            prevState.filter((movie) => movie.getId() != movieId),
        );
    };

    const addCompany = (newCompany: Company) => {
        setCompanies(prevState => [...prevState, newCompany]);
    }

    const removeCompany = (companyId: number) => {
        setCompanies((prevState: Company[]) =>
            prevState.filter((company) => company.getId() != companyId),
        );
    }

    useEffect(() => {
        if (isOnline && isServerOnline) {
            const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
            pendingApiCalls.forEach((apiCall: ApiCall) => {
                axios({
                    method: apiCall.method,
                    url: apiCall.url,
                    data: apiCall.data
                })
                .then(response => {
                    console.log('API call successful:', apiCall.method, response.data);
                })
                .catch(error => {
                    console.error('Error executing API call:', error);
                });
            });
            localStorage.removeItem('pendingApiCalls');
            setMovies([]);
        }
    }, [isOnline, isServerOnline]);

    if (!isOnline) {
        return <Alert severity="warning">You are currently offline. Please check your internet connection.</Alert>;
    }

    return (
        <MoviesContextProvider
            movieContext={{ movies, addMovie, removeMovie }}
        >
            <CompanyContextProvider companyContext={{ companies, addCompany, removeCompany }}>
                <ServerStatusContext.Provider value={isServerOnline}>
                    <AuthContext.Provider value={isAuthenticated}>
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={<DisplayMoviesPage />} />
                                <Route path='/addMovie' element={<AddMoviePage />} />
                                <Route path='/editMovie/:movieId' element={<EditMoviePage />}/>

                                <Route path='/companies' element={<DisplayCompaniesPage/>} />
                                <Route path='/addCompany' element={<AddCompanyPage />} />
                                <Route path='/editCompany/:companyId' element={<EditCompanyPage />} />

                                <Route path='/chart' element={<ChartPage />} />

                                <Route path='/register' element={<RegisterPage />} />
                                <Route path='/login' element={<LoginPage />} />

                            </Routes>
                        </BrowserRouter>
                    </AuthContext.Provider>
                </ServerStatusContext.Provider>
            </CompanyContextProvider>
        </MoviesContextProvider>
    );
}

export default App;
