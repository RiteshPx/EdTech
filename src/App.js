import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Signup from './pages/UserAuth/Signup';
import Login from '../src/pages/UserAuth/Login'
import { Navigation } from './pages/Navigation';
import StudentHomePage from './pages/studentPages/StudentHomePage';
import  InstructorHomePage  from './pages/instructorPages/InstructorHomePage';
import { AdminLogin } from './pages/AdminLogin';
import { NotFound } from './pages/NotFound';
import { StudentPrivateRouter } from './pages/PrivateRouter/StudentPrivateRouter';
import AllCourses from './pages/AllCourses';
import { ToastContainer } from 'react-toastify';
import CourseDetails from './pages/CourseDetail';
import ContactForm from './pages/ContactForm';
import { InstructorPrivateRouter } from './pages/PrivateRouter/InstructorPrivateRouter';
import { ResetPassword } from './pages/UserAuth/ResetPassword';
import { VerifyResetPassword } from './pages/UserAuth/VerifyResetPassword';
import EnrollmentSuccess from './pages/studentPages/EnrollmentSuccess';

function App() {
  return (
    <div className='bg-primay'>
      <ToastContainer
        theme="dark" // Options: "light", "dark", "colored"
        position="top-center" // Default position for all toasts
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/showAllCourses' element={<AllCourses />} />
        <Route path='/showCourse/:courseId' element={<CourseDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contactForm' element={<ContactForm />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/resetPassword/:token' element={<VerifyResetPassword />} />

        <Route path='/Student' element={
          <StudentPrivateRouter>
            <StudentHomePage />
          </StudentPrivateRouter>} />

          <Route path='/EnrollmentSuccess' element={
          // <StudentPrivateRouter>
            <EnrollmentSuccess />
          // </StudentPrivateRouter> 
          }/>
        <Route path='/Instructor' element={
          <InstructorPrivateRouter>
            <InstructorHomePage />
          </InstructorPrivateRouter>
        } />

        <Route path='/AdminLogin' element={<AdminLogin />}/>    
        <Route path='*' element={<NotFound />} />

      </Routes>

    </div>
  );
}

export default App;
