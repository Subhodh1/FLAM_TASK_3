import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventPopup from './EventPopup';
import './Calender.css';
import './App.css'


const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: "Meeting with Hari",
    start: new Date(moment().add(1, 'days').set({ hour: 10, minute: 0 })),
    end: new Date(moment().add(1, 'days').set({ hour: 11, minute: 0 })),
    color:"#ADD8E6"
  },
  {
    id: 2,
    title: "Meeting with Aditi",
    start: new Date(moment().subtract(9, 'days').set({ hour: 12, minute: 0 })),
    end: new Date(moment().subtract(9, 'days').set({ hour: 13, minute: 0 })),
    color:"#DDA0DD"
  },
  {
    id: 3,
    title: "Meeting with Raksh",
    start: new Date(moment().subtract(20, 'days').set({ hour: 14, minute: 0 })),
    end: new Date(moment().subtract(20, 'days').set({ hour: 15, minute: 0 })),
    color:    "#FFCCCB"
  },
  {
    id: 4,
    title: "Meeting with Subham",
    start: new Date(moment().subtract(15, 'days').set({ hour: 8, minute: 0 })),
    end: new Date(moment().subtract(15, 'days').set({ hour: 9, minute: 0 })),
    color:"#FFB6C1"
  },
];

export default function Calender() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);


  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      const parsed = JSON.parse(storedEvents);
      const loadedEvents = parsed.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
        color: ev.color || getRandomColor()
      }));
      setEvents(loadedEvents);
    } else {
      setEvents(initialEvents);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  },[events]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setIsOpenEvent(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    setIsOpenEvent(true);
    setHoveredDate(slotInfo.start);
  };
  const getRandomColor = () => {
  const colors = [
    "#ADD8E6", // light blue
    "#90EE90", // light green
    "#FFCCCB", // light red
    "#FFD580", // light orange
    "#DDA0DD", // plum
    "#B0E0E6", // powder blue
    "#F5DEB3", // wheat
    "#E6E6FA", // lavender
    "#F0E68C", // khaki
    "#FFB6C1"  // light pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventData.id ? eventData : ev))
      );
    } else {
      const newEvent = {
        ...eventData,
        id: Date.now() ,
        color: getRandomColor()
      };
      setEvents((prev) => [...prev, newEvent]);
    }


    setIsOpenEvent(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };
  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((ev) => ev.id !== id));
    setIsOpenEvent(false);
    setSelectedEvent(null);
  };

  const handleAddEventClick = () => {
    setSelectedDate(new Date()); 
    setSelectedEvent(null); 
    setIsOpenEvent(true);
  };




  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#fef9e7",
        borderTop: "2px solid black",
        borderBottom: "2px solid black",
      }}
    >
      <h1
        style={{
          margin: 0,
          padding: "20px",
          textAlign: "center",
          fontSize: "36px",
          color: "#333",
          textShadow: "1px 1px 0px #ccc",
        }}
      >
        📅 My Event Calendar
      </h1>

      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          color: "#666",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        “Success is the sum of small efforts, repeated day in and day out.” –
        Robert Collier
      </p>

      <div
        style={{
          margin: "100px auto",
          maxWidth: "1200px",
          padding: "30px",
          backgroundColor: "#f6ecff", // ✅ soft background (lavender tint)
          border: "2px solid black", // ✅ black outer outline
          borderRadius: "16px", // ✅ rounded corners
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)", // ✅ optional soft shadow
        }}
      >
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="rbc-calendar !text-gray-800"
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          style={{ height: "77vh" }}
          views={["month", "week", "day"]}
          timeslots={1}
          step={60}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#e0e0e0",
              color: "black",
              borderRadius: "5px",
              border: "none",
              padding: "4px",
            },
          })}
        />
        <style>
          {`
    .rbc-day-bg:hover {
      background-color: #ffe8b3 !important;
      transform: scale(1.02);
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
    }
  `}
        </style>
      </div>

      {isOpenEvent && (
        <EventPopup
          isOpen={isOpenEvent}
          onClose={() => setIsOpenEvent(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          date={selectedDate}
          event={selectedEvent}
        />
      )}
      <button
        onClick={handleAddEventClick}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#6200ea",
          color: "white",
          fontSize: "36px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 1000,
        }}
        title="Add New Event"
      >
        +
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          padding: "0 40px",
        }}
      >
        {/* LEFT: Upcoming Events */}
        <div
          style={{
            width: "20%",
            backgroundColor: "#f3f4f6",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid black",
          }}
        >
          <h3 style={{ color: "#333", fontSize: "18px", marginBottom: "10px" }}>
            📌 Upcoming
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              fontSize: "14px",
              color: "#555",
            }}
          >
            <li>🗓️ Jun 27 – FLAM TASK Submission</li>
            <li>👰 Hari’s Marriage</li>
            <li>💬 Meeting with Hari</li>
          </ul>
        </div>

        {/* CENTER: Your FullCalendar or Calendar Component */}
        <div style={{ width: "60%" }}>
          {/* Include your calendar component here */}
          {/** Example: <FullCalendar ... /> **/}
          <button
          onClick={() => (window.location.href = "/")}
          style={{
            backgroundColor: "#3333cc",
            color: "white",
            padding: "20px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            marginBottom:"30px"
          }}
        >
          ⬅️ Go to Home
        </button>
        </div>

        {/* RIGHT: Notes Section */}
        <div
          style={{
            width: "20%",
            backgroundColor: "#fff3e0",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid black",
          }}
        >
          <h3
            style={{ color: "#6d4c41", fontSize: "18px", marginBottom: "10px" }}
          >
            📝 Notes
          </h3>
          <ul
            style={{
              listStyleType: "circle",
              paddingLeft: "20px",
              fontSize: "14px",
              color: "#6d4c41",
            }}
          >
            <li>Check tasks before 5 PM</li>
            <li>Call Subham</li>
            <li>Prepare for meeting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
