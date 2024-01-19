import React, { useState } from "react";
import API from "../api";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter(user=> user._id !== userId ))
    }
    const renderPhrase = (n) => {
        const lastNum = Number(n.toString().slice(-1));
        const phrase = ' зустрітись з тобою'

        if(n > 4 && n < 20) return ' людей хочуть' + phrase
        if([2,3,4].indexOf(lastNum) >= 0) return ' людини хочуть' + phrase
        if(lastNum === 1) return ' людина хоче' + phrase
        
        return ' людини хочуть' + phrase
    }
    
    return (
        <>
        <h2><span className={"badge text-light bg-"+(users.length > 0 ? 'primary' : 'danger') }>
        {users.length > 0 ? users.length + renderPhrase(users.length) : 'Не сьогодні'}
        </span></h2>
        {users.length > 0 &&
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Ім'я</th>
                    <th scope="col">Якості</th>
                    <th scope="col">Професія</th>
                    <th scope="col">Зустрічей, кількість</th>
                    <th scope="col">Оцінка</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    return (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.qualities.map(quality => <span key={quality._id} className={`badge text-light m-1 bg-` + quality.color}>{quality.name}</span>)}</td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td><button className="btn btn-danger" onClick={()=>handleDelete(user._id)}>Видалити</button></td>
                        </tr> 
                   ) 
                })}
            </tbody>
            </table>
        } 
        </>
    )
}

export default Users

