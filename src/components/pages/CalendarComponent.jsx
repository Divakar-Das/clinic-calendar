import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FormModal from '../modal/FormModal';
import styled from '@emotion/styled';


// -----------> Main Calendar Component
const CalendarComponent = () => {

  //----------Initialize localizer using moment----------
  const localizer = momentLocalizer(moment);

  // -----------Used to hold the currently selected date-----------
  const [selectedData, setSelectedData] = useState(null);

  // ----------Manage form inputs------------
  const [formData, setFormData] = useState({
    doctor: "",
    patient: "",
    time: ""
  });


  // ----------------> Form Modal State and Handlers

  // -------For Modal open---------
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  // --------Close modal-----------
  const handleClose = () => {
    setOpen(false);
  };

  // --------------> Calendar Events Management

  // ---------Store calendar events-----------
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    if (saved) {
      const parsedObject = JSON.parse(saved);
      // This Convert strings back into object, Because react big calendar need start & end to be objects not strings.
      return parsedObject.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // -------Add new event to calendar--------
  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  // -------Styling for Event Component----
  const EventStyle = styled(Typography)(({ theme }) => ({
    fontSize: ".9rem",
    textWrap: "wrap",
    whiteSpace: "normal",
    wordWrap: "break-word",
    overflow: "visible"
  }));

  // ------Custom calendar cells data format-----
  const CustomEvent = ({ event }) => {
    return (
      <>
        <EventStyle variant='p' component={"div"}>
          {event.title}
        </EventStyle>
      </>
    );
  };

  return (
    <>
      {/* --------------Wrapper for full-page layout----------- */}
      <Box
        sx={{
          height: '100vh',
          bgcolor: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
          display: 'flex',
          padding: "0 20px",
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        {/* -------------Paper container for calendar layout---------- */}
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            borderRadius: "10px",
            overflow: 'hidden',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          }}
        >

          {/* ------------Title of the calendar--------------- */}
          <Box
            sx={{
              background: 'linear-gradient(90deg, #2196f3, #9c27b0)',
              color: 'white',
              padding: "20px 30px",
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, letterSpacing: 1, fontVariant: "small-caps" }}
            >
              Clinic Calendar
            </Typography>
          </Box>

          {/* -------------Calendar component------------ */}
          <Box sx={{ padding: "20px", background: '#fff' }}>
            <Calendar
              selectable
              localizer={localizer}
              events={events}
              onSelectSlot={(slotInfo) => {
                setSelectedData(slotInfo.start); // store the selected start time
                handleOpen();
              }}
              // use custom render
              components={{
                event: CustomEvent,
              }}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: '75vh',
                cursor: "pointer",
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* --------Modal form to add new events------------- */}
      <FormModal
        open={open}
        handleClose={handleClose}
        input={formData}
        setInput={setFormData}
        selectedData={selectedData}
        onAdd={handleAddEvent}
      />
    </>
  );
};

export default CalendarComponent;
