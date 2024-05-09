import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

// Define Organization schema
const organizationSchema = new mongoose.Schema({
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
});

export const Organization = mongoose.model('Organization', organizationSchema);