import React from 'react';
import NavbarComponent from "../components/NavbarComponent";
import { Link } from "react-router-dom";

const Grad = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <NavbarComponent />
            <div className="text-center p-4">
                <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Congratulations!</h1>
                <p className="text-xl text-gray-700">You have completed all of the lessons and quizzes.</p>
                <p className="text-xl text-gray-700 mb-4">Now you can play with the world!</p>
                <Link to="/play">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out">
                        Play
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Grad;
