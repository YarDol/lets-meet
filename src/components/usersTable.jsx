import React from 'react'
import User from './user';
import PropTypes from 'prop-types'
import TableHeader from './tableHeader';

const UsersTable = ({users, onSort, selectedSort, ...rest}) => {

    const columns = {
        name: {iter:"name", name:"Ім'я"},
        qualities: {name:"Якості"},
        professions: {iter:"profession.name", name:"Професія"},
        completedMeetings: {iter:"completedMeetings", name:"Зустрічей, раз"},
        rate: {iter:"rate", name:"Оцінка"},
        bookmark: {iter:"bookmark", name:"Вподобані"},
        delete: {}
    }

    return (
        <table className="table">
            <TableHeader {...{onSort, selectedSort, columns}}/>
            <tbody>
                {users.map((user) => (
                    <User {...rest} {...user} key={user._id} />
                ))}
            </tbody>
        </table>
    )
}

UsersTable.protoType ={
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object
}

export default UsersTable;