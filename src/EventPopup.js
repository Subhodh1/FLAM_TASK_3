import React, { useEffect, useState } from "react";

export default function EventPopup({ isOpen, onClose, onSave, onDelete, date, event }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (event && event.title && event.start && event.end) {
      setTitle(event.title || "");
      setStart(new Date(event.start).toISOString().slice(0, 16));
      setEnd(new Date(event.end).toISOString().slice(0, 16));
    } else if (date) {
      const selectedDate = new Date(date);
      const now = new Date();
      selectedDate.setHours(now.getHours());
      selectedDate.setMinutes(now.getMinutes());
      selectedDate.setSeconds(0);
      selectedDate.setMilliseconds(0);
      const endDate = new Date(selectedDate.getTime() + 60 * 60 * 1000); // +1 hour

      setStart(selectedDate.toISOString().slice(0, 16));
      setEnd(endDate.toISOString().slice(0, 16));
      setTitle("");
    }
  }, [isOpen, date, event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: event?.id || Date.now(),
      title,
      start: new Date(start),
      end: new Date(end),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff9e6",
          padding: "25px",
          borderRadius: "12px",
          width: "420px",
          border: "2px solid black",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
          fontFamily: "sans-serif",
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {event ? "Edit Event" : "Add Event"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start:</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End:</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cancel
            </button>

            {event && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this event?")) {
                    onDelete(event.id);
                  }
                }}
                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
