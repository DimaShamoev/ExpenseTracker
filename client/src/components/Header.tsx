import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { FaSignOutAlt } from 'react-icons/fa'
import { SiBlockchaindotcom } from 'react-icons/si'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocaleStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'

const Header: React.FunctionComponent = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocaleStorage('token')
        toast.success("You Logged Out")
        navigate('/')
    }

    return (
        <header className='flex items-center shadow-sm bg-slate-800 backdrop-blur-sm p-5'>
            <Link to='/'>
                <SiBlockchaindotcom size={30} />
            </Link>

            {
                isAuth && (
                    <nav className='ml-auto mr-10 flex items-center gap-5'>
                        <ul className="flex items-center gap-5 ml-auto">
                            <li>
                                <NavLink to={'/'} className={({isActive}) => isActive ? 'text-white' : 'text-white/50' }>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/transactions'} className={({isActive}) => isActive ? 'text-white' : 'text-white/50' }>Transactions</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/categories'} className={({isActive}) => isActive ? 'text-white' : 'text-white/50' }>Categories</NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }

            {
                isAuth ? (
                    <button
                        className='btn px-5 btn-red cursor-pointer roboto'
                        onClick={logoutHandler}
                    >
                        <span>Log Out</span>
                        <FaSignOutAlt />
                    </button>
                ) : (
                    <Link
                        className=' py-2 text-white/50 hover:text-white ml-auto'
                        to={'/auth'}
                    >
                        Sign In / Sign Up
                    </Link>
                )
            }

        </header>
    )
}

export default Header;