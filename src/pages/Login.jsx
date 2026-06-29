import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Box,
} from "@mui/material";

import { login } from "../services/auth";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const data = await login(
                email,
                password
            );

            localStorage.setItem(
                "token",
                data.access_token
            );

            navigate("/dashboard");

        } catch (err) {

            alert("Invalid Login");

            console.error(err);

        }

    };

    return (

        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >

            <Card sx={{ width: 400 }}>

                <CardContent>

                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        Hospital Billing Agent
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={(e)=>
                            setEmail(e.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        value={password}
                        onChange={(e)=>
                            setPassword(e.target.value)
                        }
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt:2 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                </CardContent>

            </Card>

        </Box>

    );

}

export default Login;