import React from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Notifs from './pages/Notifs'
import SubmitInternship from './pages/SubmitInternship'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminPostNotifs from './pages/AdminPostNotifs'
import AdminNotifs from './pages/AdminNotifs'
import AdminSearch from './pages/AdminSearch'
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
          <Route path="/Login" exact element={<Login/>} />
          <Route path="/AdminLogin" exact element={<AdminLogin/>} />
          <Route path="/Signup" exact element={<Signup/>} />
          <Route path="/dashboard" exact element={<RequireAuth loginPath='/Login'><Dashboard/></RequireAuth>} />
          <Route path="/notifications" exact element={<RequireAuth loginPath='/Login'><Notifs/></RequireAuth>} />
          <Route path="/submitinternship" exact element={<RequireAuth loginPath='/Login'><SubmitInternship/></RequireAuth>} />
          <Route path="/admindashboard" exact element={<RequireAuth loginPath='/AdminLogin'><AdminDashboard/></RequireAuth>} />
          <Route path="/adminpostnotifs" exact element={<RequireAuth loginPath='/AdminLogin'><AdminPostNotifs/></RequireAuth>} />
          <Route path="/adminnotifs" exact element={<RequireAuth loginPath='/AdminLogin'><AdminNotifs/></RequireAuth>} />
          <Route path="/adminsearch" exact element={<RequireAuth loginPath='/AdminLogin'><AdminSearch/></RequireAuth>} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
