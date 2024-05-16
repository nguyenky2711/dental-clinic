import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginPage from './features/Auth/Login';
import SignUpPage from './features/Auth/Signup';
import StaffPage from './features/Manage/Staff';


function App() {
  return (
    <div className="App">

      {/* <Header></Header> */}
      <Routes>
        {/* <Route path='/' Component={HomePage} /> */}



        <Route path='/login' Component={LoginPage} />
        <Route path='/signup' Component={SignUpPage} />
        <Route path='/manage/staff' Component={StaffPage} />
        {/* <Route path='/update/password' Component={ChangePasswordPage} /> */}
        {/* <Route path='/resetPassword/reset/:resetToken' Component={ResetPasswordPage} /> */}
        {/* <Route path='/resetPassword/request' Component={ResetPasswordPage} /> */}
      </Routes>
      {/* <Footer></Footer> */}
      <ToastContainer />
    </div>
  );
}

export default App;
