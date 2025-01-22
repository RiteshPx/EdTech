import { useContext, React } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

export const StudentPrivateRouter = ({ children }) => {
    {
        const { isAuthenticated, user, loading } = useContext(AuthContext);
        if (loading) {
            return (
                <div className="h-screen flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            )
        }
        console.log(isAuthenticated, "user middle", user);
        if (isAuthenticated && user.accountType === "Student") {
            return children;
        }
        else {
            return <Navigate to='/login' />
        }
    }
}
