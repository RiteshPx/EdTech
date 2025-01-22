
import {React,useContext} from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

export const InstructorPrivateRouter = ({children}) => {
        {
            const {isAuthenticated,loading,user} = useContext(AuthContext)
            if (loading) {
                return (
                    <div className="h-screen flex items-center justify-center">
                        <span className="loader"></span>
                    </div>
                )
            }
            if(isAuthenticated && user.accountType ==="Instructor") {
                return children;
            }
            else {
                return <Navigate to='/login'/>
            }
        }
}
