import http from 'http';
import { Server } from 'socket.io';
import dotenv, { populate } from 'dotenv';
import mongoose from 'mongoose';
import { movies } from './controllers/movieController';
import {companies} from "./controllers/companyController";
import { populateDatabase } from './populateDatabase';

const app = require('./app');


const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('client connected');

  const interval = setInterval(async () => {
    try {
      const movie = await movies.createMovie();
      socket.emit('newMovie', movie);
    } catch (error) {
      console.error('Error generating and saving Movie:', error);
    }
  }, 90000);

    socket.on('disconnect', () => {
        console.log('client disconnected');
        clearInterval(interval);
    });
});

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGODB_URI ||
                        'mongodb+srv://gotaseptimiuandrei:Lf50DYqQBF9Vo12N@clusterx.kbnqmco.mongodb.net/?retryWrites=true&w=majority&appName=ClusterX';

mongoose.connect(MONGOURI)
  .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server is running on port http://13.50.108.50:${PORT}/api`);
            //populateDatabase(movies, companies);
        });
    })
  .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
  });