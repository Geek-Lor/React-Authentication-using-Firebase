import React, {useState} from 'react'
import { Form, Button , Card, Alert } from 'react-bootstrap'

//Use Auth Context
import { useAuth } from '../context/authContext/AuthProvider'

const Signup = () => {

    const { signup } = useAuth();

   const [user , setUser] = useState({
       email:'',
       password:'',
       confirmPassword:''
   })

   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false);

   const {email, password, confirmPassword} = user;

   const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value})

   

   const handleSubmit = async (e) => {
       e.preventDefault()
       if(password !== confirmPassword){
           return setError('Passwords do not Match')
       }

       try {
           setError('')
           setLoading(true);
           await signup(email,password)
       } catch {
           setError('Cannot create Account')
       }
       setLoading(false);
   }

    if(error) {
        setTimeout(() => setError(''), 3000)
    }


    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-centre mb-4"> Sign Up </h2>
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
                    <Form.Group id='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange} 
                        required
                        />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type='submit'>
                        Sign Up
                    </Button>
                </Form>
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
            Already have an Account? Log In   
            </div> 
        </>
    )
}
export default Signup