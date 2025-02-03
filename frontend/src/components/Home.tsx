import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>

      <Link to="/books">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Books
        </button>
      </Link>
    </div>
  );
};
export default Home;
