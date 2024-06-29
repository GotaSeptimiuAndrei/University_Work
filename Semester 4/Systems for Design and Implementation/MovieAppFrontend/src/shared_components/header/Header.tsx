import { Link } from 'react-router-dom';
import './Header.css';
import {Button} from "@mui/material";

const Header = () => {
    return (
        <>
            <div className='login-register-buttons'>
                <Link to='/login' className='link'>
                        <Button variant='contained'>Login</Button>
                </Link>
                <Link to='/register' className='link'>
                        <Button variant='contained'>Register</Button>
                </Link>
            </div>
            <div className='header' data-testid='header-test-id'>
                <nav className='navbar'>
                    <div className='title'>Movies 2 Watch</div>

                    <div className='links'>
                        <div>
                            <Link to='/' className='link'>
                                Show movies
                            </Link>
                        </div>

                        <div>
                            <Link to='/addMovie' className='link'>
                                Add a movie
                            </Link>
                        </div>

                        <div>
                            <Link to='/companies' className='link'>
                                Companies
                            </Link>
                        </div>

                        <div>
                            <Link to='/addCompany' className='link'>
                                Add a company
                            </Link>
                        </div>

                        <div>
                            <Link to='/chart' className='link'>
                                Chart
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export { Header };
