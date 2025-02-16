import {Button, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LoginPage.css';
import React from 'react';

export const AuthContext = createContext<{
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}>({auth: false, setAuth: () => {}});

const LoginPage = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');
        const expirationTime = localStorage.getItem('expirationTime');

        if (token && expirationTime) {
            const currentTime = Date.now();
            console.log('Current time:', currentTime);
            const remainingTime = parseInt(expirationTime, 10) - currentTime;
            console.log('Remaining time:', remainingTime);

            if (remainingTime > 0) {
                // Token is still valid, reset the timer
                console.log(
                    'Token is still valid. Session will expire in',
                    remainingTime / 1000,
                    'seconds.',
                );
            } else {
                // Token has expired, logout the user
                logout();
                console.log('Token has expired. User logged out.');
            }
        }
    };

    useEffect(() => {
        // Check token validity on page load
        checkTokenValidity();
        const token = localStorage.getItem('token');
        setAuth(!!token);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://13.50.108.50:5000/api/login', formData);
            const {token} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('username', formData.username);

            const expirationTime = Date.now() + 10 * 60 * 1000;
            localStorage.setItem('expirationTime', expirationTime.toString());

            setTimeout(logout, expirationTime - Date.now());
            setAuth(true);
            console.log('User logged in:', response.data);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('expirationTime');
        setAuth(false);
        navigate('/login');
    };

    const getRemainingTime = () => {
        const expirationTime = parseInt(localStorage.getItem('expirationTime') ?? '0');
        const currentTime = Date.now();
        const timeDifference = expirationTime - currentTime;
        const remainingSeconds = Math.max(0, Math.floor(timeDifference / 1000));
        return remainingSeconds;
    }

    function handleRegister(): void {
        navigate('/register');
    }

    function handleGoHome(): void {
        navigate('/');
        window.location.reload();
    }

    return (
        <div className='login-page-container'>
            <Typography variant='h5' component='h1' gutterBottom>
                Login
            </Typography>
            {auth ? ( // Render different content if user is logged in
                <div className='action-buttons'>
                    <Typography variant='body1' gutterBottom>
                        You are logged in as: {localStorage.getItem('username')}
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Your session will expire in: {getRemainingTime()}{' '}
                        seconds
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={logout}
                        className='buttons'
                    >
                        Logout
                    </Button>
                    <Button className='buttons' onClick={handleGoHome}>
                        Back to Home
                    </Button>
                </div>
            ) : (
                <form className='login-form' onSubmit={handleSubmit}>
                    <TextField
                        label='Username'
                        variant='outlined'
                        margin='normal'
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label='Password'
                        variant='outlined'
                        margin='normal'
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        variant='contained'
                        type='submit'
                        className='buttons'
                    >
                        Login
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleRegister}
                        className='buttons'
                    >
                        Register
                    </Button>
                    <Button className='buttons' onClick={handleGoHome}>
                        Back to Home
                    </Button>
                </form>
            )}
        </div>
    );
}

export default LoginPage;