import request from 'supertest';
import mongoose from 'mongoose';
import { MovieModel } from '../models/movieSchema';
import { CompanyModel } from '../models/companySchema';


const URI = process.env.MONGODB_URI ||
    'mongodb+srv://gotaseptimiuandrei:Lf50DYqQBF9Vo12N@clusterx.kbnqmco.mongodb.net/?retryWrites=true&w=majority&appName=ClusterX';
const app = require('../app');



beforeAll(async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
});

afterAll(async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB Atlas');
    } catch (error) {
        console.error('Error disconnecting from MongoDB Atlas:', error);
    }
});

describe('Movie Routes', () => {
    it('should create a new movie', async () => {
        const res = await request(app)
            .post('/api/addMovie')
            .send({
                title: 'Test Movie',
                year: 2024,
                genre: 'Test Genre',
                company: 'Test Company',
                image: 'Test Image'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title', 'Test Movie');
    });

    it('should return a list of movies', async () => {
        const res = await request(app).get('/api/movies');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a specific movie', async () => {
        const movie = new MovieModel({
            title: 'Test Movie',
            year: 2024,
            genre: 'Test Genre',
            company: 'Test Company',
            image: 'Test Image'
        });
        await movie.save();

        const res = await request(app).get(`/api/movies/${movie.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Test Movie');
        expect(res.body).toHaveProperty('year', 2024);
        expect(res.body).toHaveProperty('genre', 'Test Genre');
        expect(res.body).toHaveProperty('company', 'Test Company');
        expect(res.body).toHaveProperty('image', 'Test Image');
    });

    it('should update a specific movie', async () => {
        const movie = new MovieModel({
            title: 'Test Movie',
            year: 2022,
            genre: 'Test Genre',
            company: 'Test Company',
            image: 'Test Image'
        });
        await movie.save();

        const res = await request(app)
            .put(`/api/movies/${movie.id}`)
            .send({
                title: 'Updated Test Movie',
                year: 2023,
                genre: 'Updated Test Genre',
                company: 'Updated Test Company',
                image: 'Updated Test Image'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Test Movie');
    });

    it('should delete a specific movie', async () => {
        const movie = new MovieModel({
            title: 'Test Movie',
            year: 2022,
            genre: 'Test Genre',
            company: 'Test Company',
            image: 'Test Image'
        });
        await movie.save();

        const res = await request(app).delete(`/api/movies/${movie.id}`);
        expect(res.statusCode).toEqual(204);
    });
});

describe('Company Routes', () => {
    it('should create a new company', async () => {
        const res = await request(app)
            .post('/api/addCompany')
            .send({
                name: 'Test Company'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('company_id');
        expect(res.body).toHaveProperty('name', 'Test Company');
    });

    it('should return a list of companys', async () => {
        const res = await request(app).get('/api/companys');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a specific company', async () => {
        const company = new CompanyModel({
            name: 'Test Company'
        });
        await company.save();

        const res = await request(app).get(`/api/companys/${company.company_id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Test Company');
    });

    it('should update a specific company', async () => {
        const company = new CompanyModel({
            name: 'Test Company'
        });
        await company.save();

        const res = await request(app)
            .put(`/api/companys/${company.company_id}`)
            .send({
                name: 'Updated Test Company'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated Test Company');
    });

    it('should delete a specific company', async () => {
        const company = new CompanyModel({
            name: 'Test Company'
        });
        await company.save();

        const res = await request(app).delete(`/api/companys/${company.company_id}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should fetch movies by a specific company', async () => {
        const company = new CompanyModel({
            name: 'Test Company'
        });
        await company.save();

        const movie = new MovieModel({
            title: 'Test Movie',
            year: 2024,
            genre: 'Test Genre',
            company: company.name,
            image: 'Test Image'
        });
        await movie.save();

        const res = await request(app).get(`/api/companys/${encodeURIComponent(company.name)}/movies`);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('title', 'Test Movie');
        expect(res.body[0]).toHaveProperty('year', 2024);
        expect(res.body[0]).toHaveProperty('genre', 'Test Genre');
        expect(res.body[0]).toHaveProperty('company', 'Test Company');
        expect(res.body[0]).toHaveProperty('image', 'Test Image');
    });
});