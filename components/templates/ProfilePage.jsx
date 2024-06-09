import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import ProfileForm from '../modules/ProfileForm';



const ProfilePage = () => {
    const { data, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        password: '',
    })


    useEffect(() => {
        if (status !== 'authenticated') {
            router.replace('/')
        }
    }, [status])


    const submitHandler = async () => {
        const res = await fetch('/api/profile', {
            method: "POST",
            body: JSON.stringify({ ...formData }),
            headers: { "Content-Type": 'application/json' }
        });

        const data = await res.json();
        console.log(data)
    }

    return (
        <div className='profile-form'>
            <h2>
                <CgProfile />
                Profile
            </h2>

            <ProfileForm
                formData={formData}
                setFormData={setFormData}
                email={data.user.email}
                submitHandler={submitHandler} />

        </div>
    )
}

export default ProfilePage