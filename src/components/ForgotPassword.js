import React, {useState} from 'react'
import { Link } from 'react-router-dom'

//Bootstrap Styling
import { Form, Button , Card, Alert } from 'react-bootstrap'

//Use Auth Context
import { useAuth } from '../context/authContext/AuthProvider'

const ForgotPassword = () => {

   const { resetPassword } = useAuth();

   const [user , setUser] = useState({
       email:'',
   });

   const [error, setError] = useState('');
   const [message, setMessage] = useState('');
   const [loading, setLoading] = useState(false);

   const {email} = user;

   const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value})

   const handleSubmit = async (e) => {
       e.preventDefault()
       try {
           setLoading(true);
           await resetPassword(email);
           setMessage(
           'Password reset successful, check your email for instructions'
           )
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
                   <h2 className="text-centre mb-4"> Reset Password </h2>
                    { error && <Alert variant='danger'>{error}</Alert>}
                    { message && <Alert variant='success'>{message}</Alert>}
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
                    <Button disabled={loading} className="w-100" type='submit'>
                        Reset
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to = '/login'> Login </Link>  
                </div> 
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
            Need an Account? <Link to='/signup' >Sign Up </Link>  
            </div> 
        </>
    )
}
export default ForgotPassword