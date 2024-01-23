import React from "react";
import Users from "./layout/users";
import Navbar from "./components/ui/navBar";
import { Routes, Route } from "react-router-dom";
import Login from "./layout/login";
import Home from "./layout/home";

function App() {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/users/:userId?/:edit?" element={<Users/>}/>
            <Route path="/login/:type?" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
        </>
    );
}

export default App;
