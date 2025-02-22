import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout: React.FunctionComponent = () => {
    return (
        <div className='min-h-screen bg-slate-900 pb-20 font-roboto text-white'>

            <Header />
            <div className="container m-auto">
                <Outlet />
            </div>


        </div>
    )
}

export default Layout