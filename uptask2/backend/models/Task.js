import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    priority: {
      type: String,
      require: true,
      enum: ['low', 'medium', 'high'],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamp: true,
  }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
