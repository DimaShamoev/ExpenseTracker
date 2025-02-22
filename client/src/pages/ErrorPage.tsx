import React from 'react'
import { Link } from 'react-router';
import errorImg from '../assets/error.png'

const ErrorPage: React.FunctionComponent = () => {
    return (
        <div className='min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
            <img src={errorImg} alt="" />
            <Link
                to={'/'}
                className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'
            >
                Go Back
            </Link>
        </div>
    )
}

export default ErrorPage;