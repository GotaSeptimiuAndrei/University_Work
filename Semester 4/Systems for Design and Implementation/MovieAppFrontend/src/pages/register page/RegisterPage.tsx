import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import './RegisterPage.css';
import { Company } from "../../models/company.ts";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        selectedCompany: '',
        newCompanyName: '',
    });
    const [companies, setCompanies] = useState([]);
    const [isOtherCompany, setIsOtherCompany] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(
                    'http://13.50.108.50:5000/api/companiesUnregistered',
                );
                const companies = response.data.map(
                    (company: any) => new Company(company.company_id, company.name),
                );
                setCompanies(companies);
            } catch (error) {
                console.error('Failed to fetch companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleCompanyChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setFormData({...formData, selectedCompany: value, newCompanyName: ''});
        setIsOtherCompany(value === 'other');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                companyName: isOtherCompany ? formData.newCompanyName : formData.selectedCompany,
            };
            const response = await axios.post('http://13.50.108.50:5000/api/register', dataToSend);
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <div className="register-page-container">
            <Typography variant='h5' component='h1' gutterBottom>
                Register
            </Typography>
            <form className='register-form' onSubmit={handleSubmit}>
                <TextField
                    name='username'
                    label='Username'
                    variant='outlined'
                    margin='normal'
                    type='text'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name='password'
                    label='Password'
                    variant='outlined'
                    margin='normal'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <FormControl
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    required
                >
                    <InputLabel>Can you find your company name here?</InputLabel>
                    <Select
                        value={formData.selectedCompany}
                        onChange={handleCompanyChange}
                        label='Can you find your company name here?'
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {companies.map((company: Company) => (
                            <MenuItem
                                key={company.getId()}
                                value={company.getName()}
                            >
                                {company.getName()}
                            </MenuItem>
                        ))}
                        <MenuItem value='other'>Other</MenuItem>
                    </Select>
                </FormControl>
                {isOtherCompany && (
                    <TextField
                        label='New Company Name'
                        variant='outlined'
                        margin='normal'
                        type='text'
                        name='newCompanyName'
                        value={formData.newCompanyName}
                        onChange={handleChange}
                        required
                    />
                )}
                <Button variant='contained' type='submit' className='buttons'>
                    Register
                </Button>
                <RouterLink to='/'>
                    <Button className='buttons'>Back to Home</Button>
                </RouterLink>
            </form>
        </div>
    );
};

export default RegisterPage;