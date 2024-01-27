import React from "react";
import Users from "./layout/users";
import Navbar from "./components/ui/navBar";
import { Routes, Route } from "react-router-dom";
import Login from "./layout/login";
import Home from "./layout/home";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route
                path="/users/:userId?/:edit?"
                element={
                    <React.Fragment>
                        <QualitiesProvider>
                        <ProfessionProvider>
                            <Users />
                        </ProfessionProvider>
                        </QualitiesProvider>
                    </React.Fragment>
                }
            />
            <Route path="/login/:type?" element={
                <React.Fragment>
                    <QualitiesProvider>
                    <ProfessionProvider>
                        <Login />
                    </ProfessionProvider>
                    </QualitiesProvider>
                </React.Fragment>
            } />
            <Route path="/" element={<Home />} />
        </Routes>
        <ToastContainer/>
        </>
    );
}

export default App;
