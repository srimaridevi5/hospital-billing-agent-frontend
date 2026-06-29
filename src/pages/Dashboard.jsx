import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LogoutIcon from "@mui/icons-material/Logout";

function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <Box sx={{ p: 4 }}>

            <Typography
                variant="h4"
                gutterBottom
            >
                Hospital Billing Agent Dashboard
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                Upload Medical Record
                            </Typography>

                            <Button
                                sx={{ mt:2 }}
                                variant="contained"
                                startIcon={<UploadFileIcon />}
                                onClick={() =>
                                    navigate("/upload")
                                }
                            >
                                Upload PDF
                            </Button>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={4}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                Invoice History
                            </Typography>

                            <Button
                                sx={{ mt:2 }}
                                variant="contained"
                                startIcon={<ReceiptLongIcon />}
                                onClick={() =>
                                    navigate("/bills")
                                }
                            >
                                View Bills
                            </Button>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={4}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                AI Billing Assistant
                            </Typography>

                            <Button
                                sx={{ mt:2 }}
                                variant="contained"
                                startIcon={<SmartToyIcon />}
                                onClick={() =>
                                    navigate("/chat")
                                }
                            >
                                Ask AI
                            </Button>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Button
                sx={{ mt:5 }}
                color="error"
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={logout}
            >
                Logout
            </Button>

        </Box>

    );

}

export default Dashboard;