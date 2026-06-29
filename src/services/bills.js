import api from "../api/api";

export async function getBills() {
    const response = await api.get("/bills");
    return response.data;
}

export function downloadInvoice(invoiceNumber) {
    window.open(
        `http://127.0.0.1:8000/bills/download/${invoiceNumber}`,
        "_blank"
    );
}