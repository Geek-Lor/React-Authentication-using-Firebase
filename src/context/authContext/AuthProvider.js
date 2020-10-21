import React, {createContext, useContext ,useReducer, useEffect} from 'react';
import authReducer from './authReducer';

//Import Firebase Auth Module
import {auth} from '../../firebase/config'

//Import Actions
import { SIGN_UP_USER, SIGN_OUT } from './actions'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const initialState = {
        currentUser: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    // Sign Up User
    const signup = (email, password) =>  
    auth.createUserWithEmailAndPassword(email,password);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => dispatch({
            type: SIGN_UP_USER,
            payload: user
        }))

        return unsubscribe
    }, [])

    //Login User
    const login = (email,password) => auth.signInWithEmailAndPassword(email,password);

    //Logout User
    const logout = () => {
        dispatch({type: SIGN_OUT });
        return auth.signOut()
    }

    //Reset Password
    const resetPassword = (email) => auth.sendPasswordResetEmail(email);

    //Update Email
    const updateEmail = (email) => state.currentUser.updateEmail(email);

    //Update Password 
    const updatePassword = (password) => state.currentUser.updatePassword(password);

    return (
        <AuthContext.Provider
        value = {{
            currentUser: state.currentUser,
            signup,
            login,
            logout,
            resetPassword,
            updateEmail,
            updatePassword
        }}
        >
            {!state.loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;