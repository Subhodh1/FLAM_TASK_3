import React from 'react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-10 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">📖 How It Works</h1>

      <div className="max-w-4xl mx-auto space-y-6 bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Viewing the Calendar</h2>
          <p>
            The calendar displays events in Month, Week, and Day views. Click on any day
            cell to create a new event.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Adding Events</h2>
          <p>
            Click on an empty date or the ➕ button at the bottom-right corner to open the event
            popup. Fill in event name, time, and details, then click <strong>Save</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Editing Events</h2>
          <p>
            Click on an existing event to open the popup with pre-filled data. Make your changes
            and click <strong>Save</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Deleting Events</h2>
          <p>
            Open an event by clicking on it, then click the <strong>Delete</strong> button to remove it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Data Persistence</h2>
          <p>
            Events are saved in your browser’s local storage, so they’ll stay even after refreshing the page.
          </p>
        </section>
      </div>
    </div>
  );
}
