
import {React,useContext} from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

export const InstructorPrivateRouter = ({children}) => {
        {
            const {isAuthenticated,user} = useContext(AuthContext)
            if(isAuthenticated && user.accountType ==="Instructor") {
                return children;
            }
            else {
                return <Navigate to='/login'/>
            }
        }
}
