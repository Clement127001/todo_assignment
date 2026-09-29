import mongoose, { Types, Document, Model, Schema } from "mongoose";

interface TodoInterface {
  title: string;
  description: string;
  author: Types.ObjectId;
  completed: boolean;
}

export interface TodoDocument extends TodoInterface, Document {}

interface TodoModel extends Model<TodoDocument> {}

const todoSchema = new Schema<TodoDocument, TodoModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [4, "Title should have 4 characters at least"],
      maxlength: [100, "Title should have 100 characters at most"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [20, "Description should have 20 characters at least"],
      maxlength: [2500, "Description should have 2500 characters at most"],
    },

    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const Todo = mongoose.model<TodoDocument, TodoModel>("Todo", todoSchema);

export default Todo;
