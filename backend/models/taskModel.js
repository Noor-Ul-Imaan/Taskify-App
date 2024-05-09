import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        //id handled automatically by database
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        // attachement: {
        //     type: Date,
        //     required: false,
        // },
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
    }, 
    {
        timestamps: true,
    }
);

export const Task = mongoose.model('Task',taskSchema); //Task instead of Book