import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be empty!"],
    },
    title: {
      type: String,
      required: [true, "title cannot be empty.!"],
    },
    author: {
      type: String,
      required: [true, "author cannot be empty.!"],
    },
    status: {
      type: String,
      enum: ["out-of-stock", "active", "archived"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user.!"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
