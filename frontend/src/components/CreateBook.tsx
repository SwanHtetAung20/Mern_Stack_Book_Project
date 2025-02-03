import { useState, useRef, useEffect } from "react";
import { useAddBookMutation } from "../features/book/bookApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const [error, setError] = useState<string | null>(null);
  const [addBook, { isError, error: apiError }] = useAddBookMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setError("");
    if (isError && apiError) {
      const err = apiError as {
        status: number;
        message?: string;
        data?: { message: string };
      };
      console.error(err);
      if (err.status === 400) {
        setError(err.data?.message as string);
      } else {
        setError(err.message as string);
      }
    }
  }, [name, title, author, status, isError, apiError]);

  const handleCreateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && title && author && status) {
      try {
        await addBook({ name, title, author, status }).unwrap();
        navigate("/books");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("EE", error);
          setError(error.message as string);
        } else {
          setError("An unknown error occurred.");
        }
      }
    } else {
      setError("Please enter name, title, author and status.!");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleCreateBook}
        className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Book Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="book name ..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Book Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="book title ..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Author
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="author ..."
          />
        </div>
        <div className="mb-6">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateBook;
