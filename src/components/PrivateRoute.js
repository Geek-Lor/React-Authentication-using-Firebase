import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Import Auth 
import { useAuth } from '../context/authContext/AuthProvider'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();


    return (
        <Route 
        {...rest}
        render= {
            props => currentUser ? <Component {...props} /> :
                    <Redirect to='/login' />
        }
        />
    )
}

export default PrivateRoute