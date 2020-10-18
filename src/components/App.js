import React from 'react';

//Bootstrap Styling
import { Container } from 'react-bootstrap'

//Import Auth Context Provider
import AuthProvider from '../context/authContext/AuthProvider'

// Import Components
import Signup from './Signup';


function App() {
  return (
    <AuthProvider>
      <Container className= 'd-flex align-items-center justify-content-center' style ={{minHeight: '100vh'}}>
        <div className="w-100" style={{maxWidth: '500px'}}>
          <Signup />
        </div>
      </Container>
    </AuthProvider> 
  );
}

export default App;
