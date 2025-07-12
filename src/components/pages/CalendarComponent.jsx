import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Paper, Typography, Divider } from '@mui/material';

const CalendarComponent = () => {
  const localizer = momentLocalizer(moment);

  const events = [
    // {
    //   title: 'Dental Checkup',
    //   start: new Date(),
    //   end: new Date(new Date().getTime() + 60 * 60 * 1000),
    // },
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
        {/* Title of the Calendar */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #2196f3, #9c27b0)',
            color: 'white',
            padding: "20px 30px",
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: 1, fontVariant: "small-caps" }}>
            Clinic Calendar
          </Typography>
        </Box>

        {/* Calendar Section */}
        <Box sx={{ padding: "20px", background: '#fff' }}>
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            onSelectSlot={(slotInfo) => {
              console.log(`user clicked date : ${slotInfo.start} `)
            }}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: '75vh',
              cursor:"pointer",
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CalendarComponent;
