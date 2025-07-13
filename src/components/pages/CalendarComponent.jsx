import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FormModal from '../modal/FormModal';
import styled from '@emotion/styled';

//Used to find screen size
import { useTheme, useMediaQuery } from '@mui/material';

//From Datepicker Library
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { CalendarContainer, CustomHeader, CustomPaper } from '../styles/CalendarComponent';

// -----------> Main Calendar Component
const CalendarComponent = () => {

  //----------Initialize localizer using moment----------
  const localizer = momentLocalizer(moment);

  //------------------Find Mobile Screen-------------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  // -----------Used to hold the currently selected date-----------
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

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
      <CalendarContainer
        sx={{
          padding:  isMobile ? "20px" : "0 20px",
          alignItems: isMobile ? "start" : 'center',
        }}
      >

        {/* -------------Paper container for calendar layout---------- */}
        <CustomPaper elevation={6} >

          {/* ------------Title of the calendar--------------- */}
          <CustomHeader>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, letterSpacing: 1, fontVariant: "small-caps" }}
            >
              Clinic Calendar
            </Typography>
          </CustomHeader>

          {/* -------------Calendar component------------ */}
          <Box sx={{ padding: "20px", background: '#fff' }}>
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
                    sx={{ margin: "10px auto", width: '100%', background: 'linear-gradient(90deg, #2196f3, #9c27b0)' }}
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
                    .map((event, idx) => (
                      <Typography key={idx} sx={{ mt: 2 }}>
                        {event.title}
                      </Typography>
                    ))}
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
      />
    </>
  );
};

export default CalendarComponent;
