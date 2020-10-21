import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

//Import Bootstrap styling
import { Card, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../context/authContext/AuthProvider'

const DashBoard = () => {
    const history = useHistory()

    const [error, setError] = useState('')

    const { currentUser, logout } = useAuth()

    const handleClick = async () => {
        try {
            await logout();
            history.push('/login')
        } catch (error) {
            setError(error.message)
        }
    }

    if(error) {
        setTimeout(() => setError(''), 5000);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-centre mb-4"> Profile </h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong> Email: </strong> {currentUser.email}
                    <Link to='/update-profile' 
                          className='btn btn-primary w-100 mt-3'
                    > 
                        Update Profile 
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick = {handleClick} > 
                    Log Out 
                </Button>
            </div>
        </>
    )
}
export default DashBoard