import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/login")
    }

    return (
        <div className="container mt-5">
            <h1>Hey, welcome!</h1>
            <button onClick={handleSubmit} className="mt-2 btn btn-primary">Перейти до входу</button>
        </div>
    );
};

export default Main;
