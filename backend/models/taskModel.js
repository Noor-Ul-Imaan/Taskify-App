import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        deadline: {
            type: Date,
            required: false,
        },
        assignedTo: {
            type: String,
            required: true,
        },
        assignedBy: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        isSubmitted: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: false,
        },
        comment: {
            type: String, // Optional comment field
            required: false,
        },
        attachment: {
            type: String, // Field for storing the file path
            required: false,
        }
    }, 
    {
        timestamps: true,
    }
);

export const Task = mongoose.model('Task', taskSchema);


