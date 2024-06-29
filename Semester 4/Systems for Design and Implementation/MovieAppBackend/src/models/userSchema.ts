import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IUser extends Document {
    user_id: number;
    company_id: number;
    username: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    user_id: { type: Number },
    company_id: { type: Number, required: true},
    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id' });

export const UserModel = mongoose.model<IUser>('User', UserSchema);