import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-500 text-white flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float-slow absolute text-8xl opacity-10 top-10 left-10">📅</div>
        <div className="animate-float-fast absolute text-7xl opacity-10 top-1/3 right-20">📆</div>
        <div className="animate-float-medium absolute text-9xl opacity-10 bottom-10 left-1/2">🗓️</div>
      </div>

      <nav className="bg-white bg-opacity-10 backdrop-blur-md w-full p-4 flex justify-between items-center z-10">
        <Link to="/" className="text-2xl font-bold">📆 Event Calendar</Link>
        <Link to="/">
          <button className="bg-white text-purple-700 px-4 py-2 rounded shadow hover:bg-purple-100 font-semibold">
            Go back to Home Page
          </button>
        </Link>
      </nav>

      <div className="flex-grow flex flex-col justify-center items-center text-center px-6 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About Event Calendar</h1>
        <p className="text-lg md:text-xl max-w-3xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 to-white animate-fade-in">
          Our Event Calendar is a beautifully designed, easy-to-use digital planner that helps you organize your meetings, reminders, and goals in one place.
          With real-time interactivity and persistent storage, it’s your ultimate productivity companion.
        </p>
        <p className="text-base max-w-xl text-white/90">
          ✨ Add, edit, and view events effortlessly<br />
          🧠 Designed for focus, clarity, and speed<br />
          💾 Events are saved automatically in local storage<br />
          📱 Fully responsive and mobile-friendly
        </p>
      </div>
    </div>
  );
}
