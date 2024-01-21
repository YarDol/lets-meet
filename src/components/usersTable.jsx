import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import BookMark from './bookmark'
import QualitiesList from './qualitiesList';

const UsersTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest}) => {

    const columns = {
        name: {path:"name", name:"Ім'я"},
        qualities: {name:"Якості", component: (user) => (<QualitiesList qualities={user.qualities}/>)},
        professions: {path:"profession.name", name:"Професія"},
        completedMeetings: {path:"completedMeetings", name:"Зустрічей, раз"},
        rate: {path:"rate", name:"Оцінка"},
        bookmark: {path:"bookmark", name:"Вподобані", component: (user) => (
        <BookMark
            status={user.bookmark}
            onClick={() => onToggleBookMark(user._id)}/>)
        },
        delete: {component: (user) => (
            <button
                className="btn btn-danger mt-2"
                onClick={() => onDelete(user._id)}>
                    Delete
            </button>
            )
        }
    }

    return (
        <table className="table">
            <TableHeader {...{onSort, selectedSort, columns}}/>
            <TableBody {...{columns, data: users}}/>
        </table>
    )
}

UsersTable.protoType ={
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UsersTable;