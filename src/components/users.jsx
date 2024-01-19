import React from "react";
import User from "./user";

const Users = ({users, ...rest}) => {
    return (
        <>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Ім'я</th>
                            <th scope="col">Якості</th>
                            <th scope="col">Професія</th>
                            <th scope="col">Зустрічі, кількість</th>
                            <th scope="col">Оцінка</th>
                            <th scope="col">Обрані</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default Users

