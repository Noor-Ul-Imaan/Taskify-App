
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

// Define Organization schema
const organizationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    numberOfLevels: {
        type: Number,
        required: true
    },
    roles: [roleSchema] // Embed role schema as subdocuments
}, 
{
    timestamps: true,
});

export const Organization = mongoose.model('Organization', organizationSchema);
