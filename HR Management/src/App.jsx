import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import Forms from './Components/Forms'
import Header from './Components/Header'
import Employee from './Page/Employee'
import Attendance from './Page/Attendance'
import LeaveList from './Page/LeaveList'
import ListForm from './Page/Employee'
import Login from './Page/Login'
import SidePanle from './Components/SidePanle'

// Simple auth context - in production use proper context API
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="">
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route 
            path='/dashboard' 
            element={
              isAuthenticated ? <SidePanle onLogout={handleLogout} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App