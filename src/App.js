import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginPage from './features/Auth/Login';
import SignUpPage from './features/Auth/Signup';
import StaffPage from './features/Manage/Staff';
import TreatmentPage from './features/Manage/Treatment';
import PatientPage from './features/Manage/Patient';
import MedicalRecordFormPage from './features/Manage/MedicalRecord/Create';
import CreatePatientPage from './features/Manage/Patient/Form';
import MedicalRecordPage from './features/Manage/MedicalRecord';
import StaffFormPage from './features/Manage/Staff/Form';
import ScheduleTable from './features/Manage/WorkingTime/ScheduleTable';
import PreviousSchedules from './features/Manage/WorkingTime/PreviousSchedule';


function App() {
  return (
    <div className="App">

      {/* <Header></Header> */}
      <Routes>
        {/* <Route path='/' Component={HomePage} /> */}



        <Route path='/login' Component={LoginPage} />
        <Route path='/signup' Component={SignUpPage} />
        <Route path='/manage/staff' Component={StaffPage} />
        <Route path='/manage/staff/create' Component={StaffFormPage} />
        <Route path='/manage/staff/:staffId' Component={StaffFormPage} />
        <Route path='/manage/treatment' Component={TreatmentPage} />
        <Route path='/manage/patient' Component={PatientPage} />
        <Route path='/manage/patient/:patientId' Component={CreatePatientPage} />
        <Route path='/manage/patient/create' Component={CreatePatientPage} />
        <Route path='/manage/patient/:patientId/medical-record' Component={MedicalRecordPage} />
        <Route path='/manage/patient/:patientId/medical-record/create' Component={MedicalRecordFormPage} />
        <Route path='/manage/patient/:patientId/medical-record/:recordId' Component={MedicalRecordFormPage} />
        <Route path='/manage/working-time' Component={ScheduleTable} />
        <Route path='/manage/working-time/past' Component={PreviousSchedules} />
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
