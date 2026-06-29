import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Bills from "./pages/Bills";
import Chat from "./pages/Chat";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/upload"
                    element={<Upload />}
                />

                <Route
                    path="/bills"
                    element={<Bills />}
                />

                <Route
                    path="/chat"
                    element={<Chat />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;