import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';

//Import Bootstrap Styling
import { Form, Button , Card, Alert } from 'react-bootstrap'

//Use Auth Context
import { useAuth } from '../context/authContext/AuthProvider'

const UpdateProfile = () => {

   const { currentUser, updateEmail, updatePassword } = useAuth();
   const  history  = useHistory()



   const [user , setUser] = useState({
       email:'',
       password:'',
       confirmPassword:''
   });

   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const {email, password, confirmPassword} = user;

   const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value})

   const handleSubmit =  (e) => {
       e.preventDefault()
       if(password !== confirmPassword){
           setUser({
               email, 
               password: '',
               confirmPassword: ''
            });
           return setError('Passwords do not Match');
       }

        

        const promises = []    
       
        if(email !== currentUser.email){
            promises.push(updateEmail(email))
        }

        if(password){
            promises.push(updatePassword(password))
        }

        Promise.all(promises)
               .then(() => history.push('/'))
               .catch((error) => setError(error.message))
               .finally(() => setLoading(false))
    
   }
    
   if(error) {
             setTimeout(() => setError(''), 3000);
        }
   

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-centre mb-4"> Update Profile </h2>
                    { error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit= {handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='email' 
                        name='email'
                        value={email} 
                        onChange={handleChange}
                        defaultValue={currentUser.email}
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
                        placeholder='Leave blank If you want to retain the same password'
                        />
                    </Form.Group>
                    <Form.Group id='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange} 
                        placeholder='Leave blank If you want to retain the same password'
                        />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type='submit'>
                        Update Profile
                    </Button>
                </Form>
               </Card.Body>
           </Card>
        <div className="w-100 text-center mt-2">
            <Link to = '/'>Cancel </Link>  
        </div> 
        </>
    )
}
export default UpdateProfile