import {useContext,React} from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

export const StudentPrivateRouter = ({children}) => {
        {
            const {isAuthenticated,user} = useContext(AuthContext)
            if(isAuthenticated && user.accountType ==="Student") {
                return children;
            }
            else {
                return <Navigate to='/login'/>
            }
        }
}
