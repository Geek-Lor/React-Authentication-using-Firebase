import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

//Bootstrap Styling
import { Form, Button , Card, Alert } from 'react-bootstrap'

//Use Auth Context
import { useAuth } from '../context/authContext/AuthProvider'

const Login = () => {

   const { login } = useAuth();
   const  history  = useHistory()



   const [user , setUser] = useState({
       email:'',
       password:'',
       confirmPassword:''
   });

   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const {email, password} = user;

   const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value})

   const handleSubmit = async (e) => {
       e.preventDefault()
       try {
           setLoading(true);
           await login(email,password);
           history.push('/');
       } catch (error) {
           setError(error.message);
       }
       setLoading(false);
   }

    if(error) {
        setTimeout(() => setError(''), 3000);
    }


    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-centre mb-4"> Login </h2>
                    { error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit= {handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='email' 
                        name='email'
                        value={email} 
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        name='password'
                        value={password} 
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type='submit'>
                        Login
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to = '/forgot-password'>Forgot Password? </Link>  
                </div> 
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
            Need an Account? <Link to='/signup' >Sign Up </Link>  
            </div> 
        </>
    )
}
export default Login