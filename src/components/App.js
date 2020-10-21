import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Bootstrap Styling
import { Container } from 'react-bootstrap'

//Import Auth Context Provider
import AuthProvider from '../context/authContext/AuthProvider'

// Import Components
import DashBoard from './DashBoard'
import Signup from './Signup'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'


function App() {
  return (
    
      <Container className= 'd-flex align-items-center justify-content-center' style ={{minHeight: '100vh'}}>
        <div className="w-100" style={{maxWidth: '500px'}}>
          <AuthProvider>
            <Router>
              <Switch>
                <PrivateRoute exact path='/' component={DashBoard} />
                <PrivateRoute exact path='/update-profile' component={UpdateProfile} />  
                <Route exact path='/signup'>
                  <Signup />
                </Route>  
                <Route exact path='/login'>
                  <Login />
                </Route> 
                <PrivateRoute exact path='/forgot-password' 
                component={ForgotPassword} 
                />
              </Switch>
            </Router>
          </AuthProvider> 
        </div>
      </Container>
    
  );
}

export default App;
