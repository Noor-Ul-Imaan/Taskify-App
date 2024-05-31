import React, { useState } from 'react';
import './SubmitTask.css';

const SubmitTask = () => {
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const taskName = "Sales Report";
    const taskDescription = "Write me a complete sales report of this week, with all necessary details.";

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', comment);

        try {
            // Replace with your backend endpoint
            await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                body: formData,
            });

            alert('Task submitted successfully!');
        } catch (error) {
            console.error('Error submitting task:', error);
            alert('Failed to submit task.');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsDone = () => {
        setIsDone(true);
        alert('Task marked as done!');
    };

    return (
        <div className="submit-task">
            <div className="task-details">
                <h1>{taskName}</h1>
                <p>{taskDescription}</p>
            </div>
            <div className="task-submit">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="file">Upload Your Work</label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Leave a Comment</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment"
                        ></textarea>
                    </div>
                    <button type="button" onClick={handleMarkAsDone} disabled={isDone}>
                        {isDone ? 'Marked as Done' : 'Mark as Done'}
                    </button>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitTask;
