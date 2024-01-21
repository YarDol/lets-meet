import React from 'react'
import PropTypes from 'prop-types'
import BookMark from './bookmark'
import QualitiesList from './qualitiesList';
import Table from './table';
import { Link } from 'react-router-dom';

const UsersTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest}) => {

    const columns = {
        name: {path:"name", name:"Ім'я", component: (user) => (<Link to={`/users/${user._id}`}>{user.name}</Link>)},
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
        <Table {...{onSort, selectedSort, columns, data: users}}/>
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