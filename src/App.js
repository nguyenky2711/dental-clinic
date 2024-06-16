import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import StaffRoute from './router/StaffRouter';
import ClientRoute from './router/ClientRouter';
import { AuthProvider } from './provider/AuthContext';
import Header from './components/Header/Header';
import AppointmentPage from './features/Client/Appointment';
import ActiveMailPage from './features/Auth/ActiveMail';
import AppointmentManagePage from './features/Manage/Appointment';


function App() {
  return (
    <AuthProvider>

      <div className="App">

        <Header />
        <Routes>
          {/* <Route path='/' Component={HomePage} /> */}
          <Route path='/login' Component={LoginPage} />
          <Route path='/appointment'
            element={
              <ClientRoute >
                <AppointmentPage />
              </ClientRoute>
            } />
          <Route path='/active/mail'
            element={
              <ClientRoute >
                <ActiveMailPage />
              </ClientRoute>
            } />
          <Route path='/manage/staff'
            element={
              <StaffRoute >
                <StaffPage />
              </StaffRoute>
            } />

          <Route
            path="/manage/staff/create"
            element={
              <StaffRoute  >
                <StaffFormPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/staff/:staffId"
            element={
              <StaffRoute  >
                <StaffFormPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/treatment"
            element={
              <StaffRoute  >
                <TreatmentPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/patient"
            element={
              <StaffRoute  >
                <PatientPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/patient/create"
            element={
              <StaffRoute  >
                <CreatePatientPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/patient/:patientId"
            element={
              <StaffRoute  >
                <CreatePatientPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/patient/:patientId/medical-record"
            element={
              <StaffRoute  >
                <MedicalRecordPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/patient/:patientId/medical-record/create"
            element={
              <StaffRoute  >
                <MedicalRecordFormPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/patient/:patientId/medical-record/:recordId"
            element={
              <StaffRoute  >
                <MedicalRecordFormPage />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/working-time"
            element={
              <StaffRoute  >
                <ScheduleTable />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/working-time/past"
            element={
              <StaffRoute  >
                <PreviousSchedules />
              </StaffRoute>
            }
          />
          <Route
            path="/manage/appointment"
            element={
              <StaffRoute  >
                <AppointmentManagePage />
              </StaffRoute>
            }
          />

          <Route path='/signup' Component={SignUpPage} />

        </Routes>
        {/* <Footer></Footer> */}
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;

// App.js


