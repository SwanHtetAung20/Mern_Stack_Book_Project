import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../common/constants";

const initialState = {
  books: [] as Book[],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setAllBooks: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(...action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(
        (book: Book) => book._id !== action.payload.id
      );
    },
  },
});

export const { setAllBooks, addBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
