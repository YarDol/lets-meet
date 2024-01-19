import React, {useState} from "react";
import Users from "./components/users";
import API from "./api";
import SearchStatus from "./components/searchStatus";

function App() {
    const [users, setUsers] = useState(API.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    }
    return (
        <div>
            <SearchStatus length={users.length} />
            <Users onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} users={users} />
        </div>
    );
}

export default App;
