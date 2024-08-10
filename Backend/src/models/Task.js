import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
