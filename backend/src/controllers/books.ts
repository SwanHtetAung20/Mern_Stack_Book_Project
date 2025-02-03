import { Request, Response } from "express";
import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";
import { NotFound } from "../errors/notFound.js";

const createBook = async (req: Request, res: Response) => {
  req.body.createdBy = req.user.id;
  const book = await Book.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ book });
};

const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find({ createdBy: req.user.id }).sort("createdAt");
  res.status(StatusCodes.OK).json({ count: books.length, books });
};

const getSingleBook = async (req: Request, res: Response) => {
  const {
    user: { id: userId },
    params: { id: bookId },
  } = req;
  const book = await Book.findOne({ _id: bookId, createdBy: userId });
  if (!book) {
    throw new NotFound(`No book with id : ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const updateBook = async (req: Request, res: Response) => {
  const {
    user: { id: userId },
    params: { id: bookId },
  } = req;
  const book = await Book.findOneAndUpdate(
    { _id: bookId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!book) {
    throw new NotFound(`No book with id : ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req: Request, res: Response) => {
  const {
    user: { id: userId },
    params: { id: bookId },
  } = req;
  const book = await Book.findOneAndDelete({ _id: bookId, createdBy: userId });
  if (!book) {
    throw new NotFound(`No book with id : ${bookId}`);
  }
  //res.sendStatus(StatusCodes.OK)
  res.status(StatusCodes.OK).json({ message: "Successfully deleted" });
};

export { createBook, getBooks, getSingleBook, updateBook, deleteBook };
