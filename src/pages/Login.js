
import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar'; // Import the Navbar component
import LoginForm from './components/LoginForm'; // Import the LoginForm component

function App() {

  return (
    <div>
      <Navbar /> {/* Use the Navbar component here */}
      <LoginForm />
    </div>
  );
}

export default App;
