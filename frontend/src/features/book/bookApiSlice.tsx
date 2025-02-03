import { apiSlice } from "../../api/apiSlice";
import { BooksResponse, Book } from "../../common/constants";

const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BooksResponse, void>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    getSingleBook: builder.query<Book, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    removeBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: (book) => ({
        url: `/books/${book.id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useGetSingleBookQuery,
  useRemoveBookMutation,
  useUpdateBookMutation,
} = bookApiSlice;
