import { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FormModal from '../modal/FormModal';
import styled from '@emotion/styled';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';

//Used to find screen size
import { useTheme, useMediaQuery } from '@mui/material';

//From Datepicker Library
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { CalendarContainer, CustomHeader, CustomPaper } from '../styles/CalendarComponent';
import { useNavigate } from 'react-router-dom';

// -----------> Main Calendar Component
const CalendarComponent = () => {
  const navigate = useNavigate()
  //----------Initialize localizer using moment----------
  const localizer = momentLocalizer(moment);

  //------------------Find Mobile Screen-------------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  // -----------Used to hold the currently selected date-----------
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  }

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
    setSelectedEvent(null); // clear editing state
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

  // -------Add new event to calendar--------
  const handleAddEvent = (newEvent) => {
    if (selectedEvent) {
      // Update existing
      setEvents(prev =>
        prev.map(event =>
          event === selectedEvent ? newEvent : event
        )
      );
      setSelectedEvent(null); // clear
    } else {
      // Add new
      setEvents(prev => [...prev, newEvent]);
    }
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


  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);


  return (
    <>
      {/* --------------Wrapper for full-page layout----------- */}
      <CalendarContainer
        sx={{
          padding: isMobile ? "20px" : "0 20px",
          alignItems: isMobile ? "start" : 'center',
          background: darkMode && "black",
        }}
      >

        {/* -------------Paper container for calendar layout---------- */}
        <CustomPaper elevation={6} >

          {/* ------------Title of the calendar--------------- */}
          <CustomHeader
            sx={{
              background: darkMode && 'linear-gradient(90deg, #1e3c72, #2a5298)', // Darker blue gradient
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, letterSpacing: 1, fontVariant: "small-caps", fontSize: isMobile && "1.7rem" }}
            >
              Clinic Calendar
            </Typography>
            <Stack direction={"row"} spacing={isMobile ? 2 : 4} sx={{ alignItems: "center" }} >
              <Button onClick={() => navigate("/")} sx={{ background: "#b12020de", color: "white", fontSize: isMobile ? ".6rem" : ".7rem" }} size='small'>Logout</Button>
              {!darkMode ? <Brightness4Icon onClick={handleDarkMode} sx={{ cursor: "pointer" }} fontSize={isMobile ? "small" : "large"} /> :
                <DarkModeIcon onClick={handleDarkMode} sx={{ cursor: "pointer" }} fontSize={isMobile ? "small" : "large"} />}
            </Stack>

          </CustomHeader>

          {/* -------------Calendar component------------ */}
          <Box sx={{ padding: "20px", background: darkMode ? "#d0d2d4ff" : '#fff' }}>
            {isMobile ?
              (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={selectedDate}
                      onChange={(newValue) => {
                        setSelectedDate(newValue);
                      }}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                  <Button
                    variant="contained"
                    sx={{
                      margin: "10px auto", width: '100%',
                      background: darkMode ? 'linear-gradient(90deg, #1e3c72, #2a5298)' : 'linear-gradient(90deg, #2196f3, #9c27b0)',
                    }}
                    onClick={() => {
                      setSelectedData(selectedDate); // pass selected date to modal
                      handleOpen(); // open modal for adding event
                    }}
                  >
                    Add
                  </Button>

                  {/* Show events on selected date */}
                  {events
                    .filter(event =>
                      dayjs(event.start).isSame(selectedDate, 'day')
                    )
                    .map((event, idx) => {
                      const [doctor, patient, time] = event.title.split(" - ").map(s => s.trim());

                      return (
                        <Button
                          key={idx}
                          variant="contained"
                          fullWidth
                          disableElevation
                          sx={{
                            justifyContent: "flex-start",
                            color: "black",
                            background: 0,
                            margin: "5px auto",
                            borderBottom: "1px solid black"
                          }}
                          onClick={() => {
                            setSelectedData(event.start);
                            setSelectedEvent(event);
                            setFormData({ doctor, patient, time });
                            handleOpen();
                          }}
                        >
                          {event.title}
                        </Button>
                      );
                    })}

                </>
              )
              :
              (<Calendar
                selectable
                localizer={localizer}
                events={events}
                onSelectSlot={(slotInfo) => {
                  setSelectedData(slotInfo.start); // store the selected start time
                  handleOpen();
                }}
                // -----------use custom render
                components={{
                  event: CustomEvent,
                }}
                onSelectEvent={(event) => {
                  const [doctor, patient, time] = event.title.split(" - ").map(s => s.trim());
                  setSelectedData(event.start);  // --------auto fill the previous date
                  setSelectedEvent(event);       // ---------set the selected event
                  setFormData({ doctor, patient, time });  // -------auto fill form
                  handleOpen();
                }}
                startAccessor="start"
                endAccessor="end"
                style={{
                  height: '75vh',
                  cursor: "pointer",
                }}
              />)}
          </Box>
        </CustomPaper>
      </CalendarContainer>

      {/* --------Modal form to add new events------------- */}
      <FormModal
        open={open}
        handleClose={handleClose}
        input={formData}
        setInput={setFormData}
        selectedData={selectedData}
        onAdd={handleAddEvent}
        selectedEvent={selectedEvent}
        darkMode={darkMode}
      />
    </>
  );
};

export default CalendarComponent;
