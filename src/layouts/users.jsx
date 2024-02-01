import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (userId === currentUser._id ? 
                        <EditUserPage /> : navigate(`/users/${currentUser._id}/edit`)
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;