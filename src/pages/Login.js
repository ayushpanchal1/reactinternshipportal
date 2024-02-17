
import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
import CNavbar from './components/CNavbar'; // Import the Navbar component
import LoginForm from './components/LoginForm'; // Import the LoginForm component

function App() {

  return (
    <div>
      <CNavbar /> {/* Use the Navbar component here */}
      <LoginForm />
    </div>
  );
}

export default App;
