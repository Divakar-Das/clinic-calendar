import { Box, Button, styled, Typography } from "@mui/material";


// -------------Custom styled modal box-----------
export const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    background: "white",
    borderRadius: "2px",
    padding: "20px 40px",
    outline: 'none',
    [theme.breakpoints.down('md')]: {
        padding: "20px",
        borderRadius: "5px"
    }
}));


export const CancelButtonBox = styled(Box)(({ theme }) => ({
    textAlign: "end",
    position: "relative",
    right: "-25px",
    top: "-5px",
    [theme.breakpoints.down('md')]: {
        right: "-10px"
    }
}))


export const CustomModalTitle = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    color: "#1e1e1e",
    marginBottom: "20px",
    fontSize: "1.8rem",
    [theme.breakpoints.down('md')]: {
        fontSize:"1.8rem"
    }
}))

export const CustomFormButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(90deg, #2196f3, #9c27b0)',
}))

