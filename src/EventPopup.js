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
      const endDate = new Date(selectedDate.getTime() + 60 * 60 * 1000);

      setStart(selectedDate.toISOString().slice(0, 16));
      setEnd(endDate.toISOString().slice(0, 16));
      setTitle("");
    }
  }, [isOpen, date, event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: event?.id || Date.now(),
      title,
      start: new Date(start),
      end: new Date(end),
    };
    onSave(eventData);
    alert(event ? "✅ Event updated successfully!" : "🎉 Event created successfully!");
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(event.id);
      alert("❌ Event deleted successfully!");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
          zIndex: 10,
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
                style={inputStyle}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Start:</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">End:</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={buttonGroupStyle}>
              <button
                type="submit"
                className="text-gray-900 bg-lime-300 hover:bg-lime-400 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Cancel
              </button>
              {event && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "90%",
  padding: "8px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "20px",
};
