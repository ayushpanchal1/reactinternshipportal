import React from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Notifs from './pages/Notifs'
import SubmitInternship from './pages/SubmitInternship'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminPostNotifs from './pages/AdminPostNotifs'
import AdminNotifs from './pages/AdminNotifs'
import AdminSearch from './pages/AdminSearch'

import 'bootstrap/dist/css/bootstrap.css';
import { AuthProvider, RequireAuth } from 'react-auth-kit';


const App = () => {
  return (
    <div>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/adminlogin" exact element={<AdminLogin/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/dashboard" exact element={<RequireAuth loginPath='/login'><Dashboard/></RequireAuth>} />
          <Route path="/notifications" exact element={<RequireAuth loginPath='/login'><Notifs/></RequireAuth>} />
          <Route path="/submitinternship" exact element={<RequireAuth loginPath='/login'><SubmitInternship/></RequireAuth>} />
          <Route path="/admindashboard" exact element={<RequireAuth loginPath='/adminlogin'><AdminDashboard/></RequireAuth>} />
          <Route path="/adminpostnotifs" exact element={<RequireAuth loginPath='/adminlogin'><AdminPostNotifs/></RequireAuth>} />
          <Route path="/adminnotifs" exact element={<RequireAuth loginPath='/adminlogin'><AdminNotifs/></RequireAuth>} />
          <Route path="/adminsearch" exact element={<RequireAuth loginPath='/adminlogin'><AdminSearch/></RequireAuth>} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
