import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import navImg from '../assets/man_sitting.png'
import authImg from '../assets/protect_toute.png'

const Home: React.FunctionComponent = () => {

    const isAuth = useAuth()
    console.log(isAuth);
    

    return (
        <div className='flex items-center justify-center min-h-[70vh]'>

            {isAuth ? (
                <div className="notice-text bg-slate-700 p-3 flex flex-col gap-2 text-xl rounded-md">
                    <p>Let's Manage your <Link to="/transactions" className='underline text-white/80 hover:text-white'>Transactions</Link> Or Create <Link to='/categories' className='underline text-white/80 hover:text-white'>Categories</Link></p>
                    <img src={navImg} alt="" className='h-[300px] m-auto'/>
                </div>
            ) : (
                <div className="notice-text bg-slate-700 p-3 flex flex-col gap-4 text-xl rounded-md">
                    <p>To Start Your Expense Track, You Should Be Authorized</p>
                    <button className='btn btn-green flex text-center items-center justify-center cursor-pointer'>
                        <Link to={'/auth'}>Let's Start</Link>
                    </button>
                    <img src={authImg} alt="" className='h-[300px] w-[200px] m-auto' />
                </div>
            )}

        </div>
    )
}

export default Home;