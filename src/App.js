import './App.css';
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { StudentLogin } from './pages/StudentLogin';
import { InstructorLogin } from './pages/InstructorLogin';
import { AdminLogin } from './pages/AdminLogin';
function App() {
  return (
    <div className="">
      <Routes>
          <Route path='/'element= {<Home/>}/>
          <Route path='/signup'element= {<Signup/>}/>
          <Route path='/login'element= {<Login/>}/>
          <Route path='/StudentLogin'element= {<StudentLogin/>}/>
          <Route Path ='/InstructorLogin' element={<InstructorLogin/>}/>
          <Route path ='/AdminLogin' element={<AdminLogin/>}/>




      </Routes>
      
    </div>
  );
}

export default App;
