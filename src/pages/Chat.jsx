import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { askAI } from "../services/chat";

function Chat() {

    const [patientName, setPatientName] = useState("");

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {

        if (!patientName || !question) {
            alert("Enter patient name and question.");
            return;
        }

        try {

            setLoading(true);

            const data = await askAI(
                question,
                patientName
            );

            setAnswer(data.answer);

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.detail ||
                err.message
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box
            sx={{
                maxWidth: 900,
                margin: "40px auto",
            }}
        >

            <Typography
                variant="h4"
                gutterBottom
            >
                AI Billing Assistant
            </Typography>

            <Card>

                <CardContent>

                    <TextField
                        fullWidth
                        label="Patient Name"
                        margin="normal"
                        value={patientName}
                        onChange={(e)=>
                            setPatientName(e.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Ask anything..."
                        margin="normal"
                        value={question}
                        onChange={(e)=>
                            setQuestion(e.target.value)
                        }
                    />

                    <Button
                        variant="contained"
                        startIcon={<SendIcon />}
                        sx={{ mt:2 }}
                        onClick={handleAsk}
                    >
                        Ask AI
                    </Button>

                </CardContent>

            </Card>

            {loading && (

                <Box sx={{ mt:3 }}>

                    <CircularProgress />

                </Box>

            )}

            {answer && (

                <Card sx={{ mt:4 }}>

                    <CardContent>

                        <Typography variant="h6">
                            AI Response
                        </Typography>

                        <Typography
                            sx={{
                                mt:2,
                                whiteSpace:"pre-wrap",
                            }}
                        >
                            {answer}
                        </Typography>

                    </CardContent>

                </Card>

            )}

        </Box>

    );

}

export default Chat;