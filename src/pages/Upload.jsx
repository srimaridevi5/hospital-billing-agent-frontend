import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";

import { uploadMedicalRecord } from "../services/upload";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);

      const data = await uploadMedicalRecord(file);

      console.log("Backend Response:", data);

      setResult(data);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Upload Medical Record
      </Typography>

      <Card>
        <CardContent>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              onClick={handleUpload}
            >
              Upload PDF
            </Button>
          </Box>
        </CardContent>
      </Card>

      {loading && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            AI is processing the medical record...
          </Typography>
        </Box>
      )}

      {result && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Invoice Generated Successfully
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography>
              <strong>Invoice Number:</strong> {result.invoice_number}
            </Typography>

            <Typography>
              <strong>Patient:</strong> {result.patient?.name}
            </Typography>

            <Typography>
              <strong>Age:</strong> {result.patient?.age}
            </Typography>

            <Typography>
              <strong>Gender:</strong> {result.patient?.gender}
            </Typography>

            <Typography>
              <strong>Diagnosis:</strong> {result.diagnosis}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Bill Items</Typography>

            <List>
              {result.bill_items?.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.name}
                    secondary={`₹ ${item.price}`}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography>
              <strong>Subtotal:</strong> ₹ {result.subtotal}
            </Typography>

            <Typography>
              <strong>GST:</strong> ₹ {result.tax}
            </Typography>

            <Typography variant="h6">
              Total: ₹ {result.total}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<DownloadIcon />}
                onClick={() =>
                  window.open(
                    `http://127.0.0.1:8000/bills/download/${result.invoice_number}`,
                    "_blank"
                  )
                }
              >
                Download Invoice
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Upload;