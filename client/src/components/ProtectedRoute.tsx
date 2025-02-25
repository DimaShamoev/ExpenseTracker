import React from 'react'
import { JSX } from 'react/jsx-dev-runtime'
import { useAuth } from '../hooks/useAuth'
import img from '../assets/protect_toute.png'

interface Props {
    children: JSX.Element
}

const ProtectedRoute: React.FunctionComponent<Props> = ({ children }) => {

    const isAuth = useAuth()

    return (
        <>

            {isAuth ? (
                children 
            ) : (
                <div className='flex flex-col justify-center items-center mt-10 gap-3'>
                    <h1 className='text-2xl'>You Must Be Logged In</h1>

                    <img src={img} alt="You Must Be Logged In" height='100' />
                </div>
            )}

        </>
    )
}

export default ProtectedRoute