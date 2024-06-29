import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface ICompany extends Document {
    company_id: number;
    name: string;
}

const CompanySchema: Schema = new Schema({
    company_id: { type: Number },
    name: { type: String, required: true }
});

CompanySchema.plugin(AutoIncrement, {inc_field: 'company_id' });

export const CompanyModel = mongoose.model<ICompany>('Company', CompanySchema);