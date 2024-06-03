import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const SignupPage = () => {
    const router = useRouter();
    const { status } = useSession();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/')
        }
    }, [status])


    const changeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const registerHandler = async () => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ ...userData }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        console.log(data)
        setUserData({
            email: '',
            password: ''
        })

        if (data.status === 'success') {
            router.replace('/signin')
        }

    }

    return (
        <div className='signin-form'>
            <h3>Registeration Form</h3>

            <input
                type='text'
                name='email'
                placeholder='Email'
                value={userData.email}
                onChange={changeHandler} />
            <input
                type='password'
                name='password'
                placeholder='password'
                value={userData.password}
                onChange={changeHandler} />

            <button onClick={registerHandler}>Register</button>

            <div>
                <p style={{ marginRight: '5px' }}>Have an Account ?</p>
                <Link href='/signin'>Sign In</Link>
            </div>

        </div>
    )
}

export default SignupPage