import { Box, Paper, styled, Typography } from "@mui/material";

export const CalendarContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    bgcolor: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
    display: 'flex',
    justifyContent: 'center',
}))



export const CustomPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: '1200px',
    borderRadius: "10px",
    overflow: 'hidden',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
}))


export const CustomHeader = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(90deg, #2196f3, #9c27b0)',
    color: 'white',
    padding: "20px 30px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
}))
