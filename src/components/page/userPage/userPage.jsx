import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import API from '../../../api'
import QualitiesList from '../../ui/qualities/qualitiesList'
import { useNavigate } from 'react-router-dom';

const UserPage = ({userId}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState()
    useEffect(()=> {
        API.users.getById(userId).then(data => setUser(data))
    })
    const handleClick = () => {
        navigate("/users");
    }
    if(user){
        return (
            <>
                <h1>{user.name}</h1>
                <h4>Професія: {user.profession.name}</h4>
                <QualitiesList qualities={user.qualities} />
                <p>CompletedMeetings: {user.completedMeetings}</p>
                <p>Rate: {user.rate}</p>
                <button onClick={handleClick}>Всі користувачі</button>
            </>
        )
    }else{
       return <h1>Loading</h1>
    }
    
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage;