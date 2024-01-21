import React from 'react'
import User from './user';
import PropTypes from 'prop-types'

const UsersTable = ({users, onSort, ...rest}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={()=>onSort('name')} scope="col">Ім'я</th>
                    <th scope="col">Якості</th>
                    <th onClick={()=>onSort('profession.name')} scope="col">Професія</th>
                    <th onClick={()=>onSort('completedMeetings')} scope="col">Зустрічей, раз</th>
                    <th onClick={()=>onSort('rate')} scope="col">Оцінка</th>
                    <th onClick={()=>onSort('bookmark')} scope="col">Вподобані</th>
                    <th onClick={()=>onSort()} />
                </tr>
            </thead>
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
    onSort: PropTypes.func
}

export default UsersTable;