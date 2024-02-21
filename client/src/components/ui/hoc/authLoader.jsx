
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionList } from '../../../store/profession'
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users'

const AuthLoader = ({children}) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn())
    const usersStatusLoading = useSelector(getUsersLoadingStatus())
    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionList())
        if(isLoggedIn){
            dispatch(loadUsersList())
        }
    }, [isLoggedIn])
    if(usersStatusLoading){
        return "Loading"
    }
    return children
}

AuthLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf, PropTypes.node], PropTypes.node)
}
 
export default AuthLoader;