
import React from 'react'
import Navbar from './components/Navbar'; // Import the Navbar component
import SignupForm from './components/SignupForm';

function App() {

  return (
    <div>
      <Navbar /> {/* Use the Navbar component here */}
      {/* <br/><br/><br/><br/><br/> */}
      <SignupForm />
    </div>
  );
}

export default App;
