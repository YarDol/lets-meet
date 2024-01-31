import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({ element, children, ...rest }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: rest.location
                }}
            />
        );
    }

    return (
        children
    );
}

ProtectedRoute.propTypes = {
    element: PropTypes.element,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
