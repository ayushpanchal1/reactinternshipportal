import React from 'react'
import Navbar from './components/Navbar'; // Import the Navbar component
import LoginForm from './components/LoginForm';

function App() {
  
  return (
    <div>
      <Navbar /> {/* Using the Navbar component here */}
      <LoginForm />
    </div>
  );
}

export default App;
