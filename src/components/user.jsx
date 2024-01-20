import React from "react";
import Quality from "./quality";
import BookMark from "./bookmark";
import PropTypes from 'prop-types'

const User = ({
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark,
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{qualities.map(quality => 
                <Quality key={quality._id} {...quality}/>    
            )}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <BookMark
                    status={bookmark}
                    onClick={() => onToggleBookMark(_id)}
                />
            </td>
            <td><button className="btn btn-danger" onClick={()=>onDelete(_id)}>Видалити</button></td>
        </tr> 
    ) 

}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;