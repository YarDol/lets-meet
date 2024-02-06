import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

function ProtectedRoute({ element, children, ...rest }) {
    const isLoggedIn = useSelector(getIsLoggedIn())

    if (!isLoggedIn) {
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
