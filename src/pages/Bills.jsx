import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import {
    getBills,
    downloadInvoice,
} from "../services/bills";

function Bills() {

    const [bills, setBills] = useState([]);

    useEffect(() => {

        loadBills();

    }, []);

    async function loadBills() {

        try {

            const data = await getBills();

            setBills(data);

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <Box sx={{ p:4 }}>

            <Typography
                variant="h4"
                gutterBottom
            >
                Invoice History
            </Typography>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Invoice</TableCell>

                            <TableCell>Patient</TableCell>

                            <TableCell>Total</TableCell>

                            <TableCell>Date</TableCell>

                            <TableCell>Download</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {bills.map((bill) => (

                            <TableRow key={bill.id}>

                                <TableCell>
                                    {bill.invoice_number}
                                </TableCell>

                                <TableCell>
                                    {bill.patient_name}
                                </TableCell>

                                <TableCell>
                                    ₹ {bill.total}
                                </TableCell>

                                <TableCell>
                                    {bill.created_at}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="contained"
                                        startIcon={<DownloadIcon />}
                                        onClick={() =>
                                            downloadInvoice(
                                                bill.invoice_number
                                            )
                                        }
                                    >
                                        Download
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>

    );

}

export default Bills;