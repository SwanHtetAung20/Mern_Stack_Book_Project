export interface Book {
  _id: string;
  name: string;
  title: string;
  author: string;
  status: string;
  book?: {
    _id: string;
    name: string;
    title: string;
    author: string;
    status: string;
  };
}

export interface BooksResponse {
  books: Book[];
  length: number;
}
