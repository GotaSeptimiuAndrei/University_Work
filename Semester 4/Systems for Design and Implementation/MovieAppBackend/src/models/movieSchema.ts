import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IMovie extends Document {
    id: number;
    title: string;
    year: number;
    genre: string;
    company: string;
    image: string;
}

const MovieSchema: Schema = new Schema({
    id: { type: Number },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String, required: true }
});

MovieSchema.plugin(AutoIncrement, {inc_field: 'id' });

export const MovieModel = mongoose.model<IMovie>('Movie', MovieSchema);
