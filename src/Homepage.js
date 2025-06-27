import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex justify-center items-center text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float-slow absolute text-8xl opacity-10 top-10 left-10">📅</div>
        <div className="animate-float-fast absolute text-7xl opacity-10 top-1/3 right-20">📆</div>
        <div className="animate-float-medium absolute text-9xl opacity-10 bottom-10 left-1/2">🗓️</div>
      </div>

      <nav className="bg-white bg-opacity-10 backdrop-blur-md fixed w-full z-20 top-0 start-0 border-b border-white/20 rounded-b-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            📆 Event Calendar
          </span>
          <div className="flex md:order-2 space-x-3">
            <Link
              to="/calender"
              className="block py-2 px-3 text-white hover:text-blue-300"
            >
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Get Started
              </button>
            </Link>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border border-white/20 rounded-lg bg-white/10 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white hover:text-blue-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-page"
                  className="block py-2 px-3 text-white hover:text-blue-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/how"
                  className="block py-2 px-3 text-white hover:text-blue-300"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 mt-16 z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Your Personal Event Management Calender📅
        </h2>

        <p className="text-lg max-w-2xl mx-auto mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-yellow-200 animate-fade-in">
          Empower your day with a smart calendar that reminds, organizes, and
          boosts your productivity — one event at a time.
        </p>

        <p className="text-lg font-mono max-w-xl whitespace-nowrap overflow-hidden border-r-2 border-white animate-typing">
          Stay focused. Stay productive. 📆
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <Link to="/calender">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          >
            GO TO CALENDAR
          </button>
        </Link>
      </div>
    </div>
  );
}
