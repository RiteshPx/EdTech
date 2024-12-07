import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Signup from './pages/UserAuth/Signup';
import Login from '../src/pages/UserAuth/Login'
import { Navigation } from './pages/Navigation';
import { StudentLogin } from './pages/StudentLogin';
import { InstructorLogin } from './pages/InstructorLogin';
import { AdminLogin } from './pages/AdminLogin';
import { useState } from 'react';
import { NotFound } from './pages/NotFound';
import { PrivateRouter } from './pages/PrivateRouter/PrivateRouter';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className='bg-primay'>
      <Navigation isLogin={isLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
        <Route path='/StudentLogin' element={
          <PrivateRouter>
            <StudentLogin />
          </PrivateRouter>} />

        <Route path='/InstructorLogin' element={
          <PrivateRouter>
            <InstructorLogin />
          </PrivateRouter>
        } />

        <Route path='/AdminLogin' element={
          <PrivateRouter>
            <AdminLogin />
          </PrivateRouter>} />
        <Route path='*' element={<NotFound />} />

      </Routes>

    </div>
  );
}

export default App;
