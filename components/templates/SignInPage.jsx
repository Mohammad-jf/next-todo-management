import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const SignInPage = () => {
    const { status } = useSession();
    const router = useRouter();


    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });


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

    const signInHandler = async () => {
        const res = await signIn('credentials', { ...userData, redirect: false });
        console.log(res)
        setUserData({
            email: '',
            password: ''
        })
    }

    return (
        <div className='signin-form'>
            <h3>SignIn Form</h3>

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

            <button onClick={signInHandler}>Sign In</button>
        </div>
    )
}

export default SignInPage