import { useNavigate } from "react-router-dom";
import { CompanyCardPropsType } from "../../types/CompanyCardProps.types.ts";
import axios from "axios";
import './CompanyCard.css';
import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../contexts/MovieContext.tsx";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

export function CompanyCard({givenCompany, removeMethod}: CompanyCardPropsType) {
    const navigate = useNavigate();

    const movies = useContext(MovieContext);
    const [movieCount, setMovieCount] = useState(0);

    useEffect(() => {
        axios.get(`http://13.50.108.50:5000/api/moviesfor/${givenCompany.getId()}`)
            .then(response => {
                setMovieCount(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [givenCompany, movies]);

    const handleCardOnClick = () => {
        navigate('/editCompany/' + givenCompany.getId());
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        axios.delete(`http://13.50.108.50:5000/api/companies/${givenCompany.getId()}`)
            .then(() => {
                removeMethod(givenCompany.getId());
            })
            .catch(error => {
                console.error('Error deleting company:', error);
            });
    };
    return (
        <div className='card' 
        data-testid='company-card'
        onClick={handleCardOnClick}
        >
            <IconButton
                className='remove-button'
                data-testid='remove-button'
                onClick={handleRemoveClick}
            >
                <HighlightOffIcon />
            </IconButton>

            <div className='card-info' 
            data-testid='card-info'>
                <div className='company-info'>
                    <div className='company-id'>ID: {givenCompany.getId()}</div>
                    <div className='name'>{givenCompany.getName()}</div>
                    <div className='movie-count'>Movies: {movieCount}</div>
                </div>
            </div>
        </div>
    );
}