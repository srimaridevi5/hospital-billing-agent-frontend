import api from "../api/api";

export async function askAI(question, patientName) {

    const response = await api.post("/chat/", {
        question: question,
        patient_name: patientName,
    });

    return response.data;
}