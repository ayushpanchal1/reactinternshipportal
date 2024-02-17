import React from 'react'
import Navbar from './components/Navbar'; // Import the Navbar component
import LoginForm from './components/LoginForm';
// import './components/red.css'
import './style/custom.scss'

function App() {
  
  return (
    <div>
      <Navbar /> {/* Using the Navbar component here */}
      <LoginForm />
    </div>
  );
}

export default App;
