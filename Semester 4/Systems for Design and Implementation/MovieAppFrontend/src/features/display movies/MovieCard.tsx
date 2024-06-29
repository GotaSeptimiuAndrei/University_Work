import {useNavigate} from 'react-router-dom';
import {MovieCardPropsType} from '../../types/MovieCardProps.types.ts';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import './MovieCard.css';
import axios from 'axios';
import React from 'react';
import { ServerStatusContext } from '../../App';

export function MovieCard({givenMovie, removeMethod}: MovieCardPropsType) {
    // let path: string = 'assets/' + givenMovie.getImage();
    const isServerOnline = React.useContext(ServerStatusContext);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token') !== null;

    const handleCardOnClick = () => {
        if (isAuthenticated)
            navigate('/editMovie/' + givenMovie.getId());
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isServerOnline) {
            axios.delete(`http://13.50.108.50:5000/api/movies/${givenMovie.getId()}`)
                .then(() => {
                    removeMethod(givenMovie.getId());
                })
                .catch(error => {
                    console.error('Error deleting movie:', error);
                });
        } else {
            removeMethod(givenMovie.getId());

            const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
            pendingApiCalls.push({
                method: 'DELETE',
                url: `http://13.50.108.50:5000/api/movies/${givenMovie.getId()}`,
            });
            localStorage.setItem('pendingApiCalls', JSON.stringify(pendingApiCalls));
        }
    };
    
    return (
        <div
            className='card'
            data-testid='movie-card'
            onClick={handleCardOnClick}
        >
            {isAuthenticated && (
                <IconButton
                    className='remove-button'
                    data-testid='remove-button'
                    onClick={handleRemoveClick}
                >
                    <HighlightOffIcon />
                </IconButton>
            )}

            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    <img src={givenMovie.getImage()} alt='movie image' />
                </div>

                <div className='movie-info'>
                    <div className='movie-id'>ID: {givenMovie.getId()}</div>
                    <div className='title'>Title: {givenMovie.getTitle()}</div>
                    <div className='year'>Year: {givenMovie.getYear()}</div>
                    <div className='genre'>Genre: {givenMovie.getGenre()}</div>
                    <div className='company'>Company: {givenMovie.getCompany()}</div>
                </div>
            </div>
        </div>
    );
}
