import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Navigation } from './pages/Navigation';
import { StudentLogin } from './pages/StudentLogin';
import { InstructorLogin } from './pages/InstructorLogin';
import { AdminLogin } from './pages/AdminLogin';
import { useState } from 'react';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  <Navigation isLogin={isLogin} setIsLogin={setIsLogin} />

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
        <Route path='/StudentLogin' element={<StudentLogin />} />
        <Route Path='/InstructorLogin' element={<InstructorLogin />} />
        <Route path='/AdminLogin' element={<AdminLogin />} />




      </Routes>

    </div>
  );
}

export default App;
