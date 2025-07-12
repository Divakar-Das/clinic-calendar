import { useState } from 'react'
import { Box, Button, Card, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import data from './utils';

const Login = () => {
    const [userDetails, setUserDetails] = useState({ email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState({ emailError: false, passwordError: false })
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    //Hardcode credentials 
    const { userEmail, userPassword } = data;

    //Handle email and password
    const handleLogin = () => {
        const passwordError = userDetails.password.trim() === "";
        const emailError = userDetails.email.trim() === "";

        setErrorMsg({ emailError, passwordError });
        if (!emailError) {
            setUserDetails(prev => ({ ...prev, email: "" }));
        }

        if (!passwordError) {
            setUserDetails(prev => ({ ...prev, password: "" }));
        }

        if (userDetails.email == userEmail && userDetails.password == userPassword) {
            navigate("/home")
            console.log(userDetails.email);
            console.log(userDetails.password);
        } else {
            alert("Wrong Email or Password")
        }

    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh", background: "#f7f7f7" }} >
                <Card sx={{ background: "white", padding: "20px 50px", maxWidth: "500px" }} >

                    <Typography variant='h5' sx={{ textAlign: "center", fontSize: "1.8rem" }} >
                        Appointment Calendar for Clinic Staff
                    </Typography>

                    <Stack spacing={3} sx={{ padding: "10px 10px" }} >

                        {/* Email Input Field */}
                        <TextField
                            label="Email"
                            value={userDetails.email}
                            type='email'
                            onChange={(e) => {
                                const value = e.target.value;
                                setUserDetails({ ...userDetails, email: value })
                                setErrorMsg(prev => ({ ...prev, emailError: value == "" ? true : false }))
                            }
                            }
                            onBlur={() =>
                                setErrorMsg(prev => ({ ...prev, emailError: userDetails.email.trim() === "" }))
                            }
                            error={errorMsg.emailError}
                            helperText={errorMsg.emailError ? 'Email is required' : ''}
                            fullWidth
                        />

                        {/* Password Input Field */}
                        <TextField
                            label="Password"
                            value={userDetails.password}
                            type={showPassword ? 'text' : 'password'}

                            // password visibility
                            slotProps={{
                                input: {
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                }
                            }
                            }
                            onChange={(e) => {
                                const value = e.target.value;
                                setUserDetails({ ...userDetails, password: value })
                                setErrorMsg(prev => ({ ...prev, passwordError: value == "" ? true : false }))
                            }
                            }
                            onBlur={() =>
                                setErrorMsg(prev => ({ ...prev, passwordError: userDetails.password.trim() === "" }))
                            }
                            error={errorMsg.passwordError}
                            helperText={errorMsg.passwordError ? 'Password is required' : ''}
                            fullWidth
                        />
                        <Button onClick={handleLogin} variant='contained' size='large'>Login</Button>
                    </Stack>
                </Card>
            </Box>
        </>
    )
}

export default Login
