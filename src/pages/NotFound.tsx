import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! The page you are looking for does not exist.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-lg shadow-md transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;