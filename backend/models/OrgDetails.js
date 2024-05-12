
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
    name: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    numberOfLevels: {
        type: Number,
        required: false
    },
    roles: [roleSchema] // Embed role schema as subdocuments
},
{
    timestamps: true,
}
);

export const Organization = mongoose.model('Organization', organizationSchema);