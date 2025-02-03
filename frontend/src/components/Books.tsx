import { Link } from "react-router-dom";
import {
  useGetBooksQuery,
  useRemoveBookMutation,
} from "../features/book/bookApiSlice";
import { Book } from "../common/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Books = () => {
  const { data, isError, error, isLoading } = useGetBooksQuery();

  const [removeBook] = useRemoveBookMutation();
  const handleDelete = async (book: Book) => {
    try {
      await removeBook(book._id).unwrap();
    } catch (error: unknown) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-3">
        <Link
          to="/create-book"
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Create Book
        </Link>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {JSON.stringify(error)}</p>}
      {data?.books && (
        <div className="flex bg-gray-700">
          {data.books.map((book: Book) => (
            <div
              key={book._id}
              className="flex items-center bg-grey-300 w-screen min-h-screen"
              style={{ fontFamily: "'Muli', sans-serif" }}
            >
              <div className="container ml-auto mr-auto flex flex-wrap items-start">
                <div className="w-full pl-5 lg:pl-2 mb-4 mt-4"></div>
                <div className="w-full ">
                  <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                    <figure className="mb-2">
                      <img
                        src="https://srv-cdn.onedio.com/store/bf2cbc886120f284ef46fd92a48f5fb58c62e6a50fbdf8fa796d057dd0ddc242.png"
                        alt="iPhone 11 Pro Max"
                        className="h-64 ml-auto mr-auto"
                      />
                    </figure>
                    <div className="rounded-lg p-4 bg-purple-700 flex flex-col">
                      <div>
                        <h5 className="text-white text-2xl font-bold leading-none">
                          {book.title}
                        </h5>
                        <span className="text-xs text-gray-400 leading-none">
                          {book.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="text-lg text-white font-light">
                          {book.author}
                        </div>
                        <FontAwesomeIcon
                          onClick={() => handleDelete(book)}
                          icon={faTrash}
                          className="m-auto text-2xl cursor-pointer transition hover:text-3xl ease-in duration-300"
                        />
                        <Link
                          to={`/edit-book/${book._id}`}
                          className="rounded-full bg-purple-900 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="stroke-current m-auto"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Books;
