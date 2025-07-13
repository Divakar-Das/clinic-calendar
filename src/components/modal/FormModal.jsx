import { useEffect, useState } from "react";
import data from "./data.json"
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';
import { CancelButtonBox, CustomFormButton, CustomModalTitle, ModalBox } from "../styles/FormModal";

// -------------> FormModal: Displays a modal
const FormModal = ({ open, handleClose, input, setInput, selectedData, onAdd, selectedEvent, darkMode }) => {

    //  ------------Local states for form fields--------------
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [time, setTime] = useState('');


    // -------------Handle form submission and create new calendar event---------
    const handleFormData = (e) => {
        e.preventDefault();

        //------- Validate form inputs-------
        if (selectedDoctor === "" || selectedPatient === "" || time === "") {
            alert("Fill all the details");
        } else {
            // -------Parse time input into hours & minutes------
            const [hours, minutes] = time.split(":");

            // ------Create start date & time input------
            const start = new Date(selectedData);
            start.setHours(parseInt(hours));
            start.setMinutes(parseInt(minutes));

            // -------Set end time to 30 minutes------
            const end = new Date(start.getTime() + 30 * 60 * 1000);

            // -----Creating new event------
            const newEvent = {
                title: `${selectedDoctor}  -  ${selectedPatient} - ${time} `,
                start,
                end,
            };

            // ---------Pass new event to parent-----------
            onAdd(newEvent);
            // ---------Update data in parent------------
            setInput({
                doctor: selectedDoctor,
                patient: selectedPatient,
                time: time
            });

            // ------------Clear form fields & close modal----------
            setSelectedDoctor("");
            setSelectedPatient("");
            setTime("");
            handleClose();
        }
    };

    //------To auto fill the editable events into inupt fields in forms
    useEffect(() => {
        setSelectedDoctor(input.doctor || "");
        setSelectedPatient(input.patient || "");
        setTime(input.time || "");
    }, [input]);

    return (
        <>
            <Modal open={open}
                disableEnforceFocus
            >
                {/* ------Modal Box----- */}
                <ModalBox>
                    <CancelButtonBox>
                        {/* -----Close Icon----- */}
                        <CancelIcon
                            onClick={handleClose}
                            sx={{ color: "#3c3b3d", cursor: "pointer", fontSize: "2rem" }}
                        />
                    </CancelButtonBox>

                    {/* -------Modal Title--------- */}
                    <CustomModalTitle
                        variant="h5"
                    >
                        {selectedEvent ? "Edit Appointment Details" : "Add Appointment Details"}
                    </CustomModalTitle>

                    {/* ------Form Inputs-------- */}
                    <Box sx={{ width: 300, margin: '10px auto' }}>
                        <Stack spacing={3}>

                            {/* ---------Doctor Dropdown-------- */}
                            <FormControl fullWidth>
                                <InputLabel id="doctor-label">Select Doctor</InputLabel>
                                <Select
                                    labelId="doctor-label"
                                    value={selectedDoctor}
                                    label="Select Doctor"
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                >
                                    {data.doctors.map((doctor, index) => (
                                        <MenuItem key={index} value={doctor.name}>
                                            {doctor.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* -----Patient Dropdown--------- */}
                            <FormControl fullWidth>
                                <InputLabel id="patient-label">Select Patient</InputLabel>
                                <Select
                                    labelId="patient-label"
                                    value={selectedPatient}
                                    label="Select Patient"
                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                >
                                    {data.patients.map((patient, index) => (
                                        <MenuItem key={index} value={patient.name}>
                                            {patient.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* ----------Time input-------*/}
                            <TextField
                                label="Select Time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                // 5-minutes intervals = 300
                                inputProps={{ step: 300 }}
                                fullWidth
                            />

                            {/* -----Add Button------ */}
                            <CustomFormButton
                                sx={{ background: darkMode ? 'linear-gradient(90deg, #1e3c72, #2a5298)' : 'linear-gradient(90deg, #2196f3, #9c27b0)' }}
                                variant='contained'
                                size='large'
                                onClick={handleFormData}
                            >
                                {selectedEvent ? "Edit" : "Add"}
                            </CustomFormButton>
                        </Stack>
                    </Box>
                </ModalBox>
            </Modal>
        </>
    );
};

export default FormModal;
