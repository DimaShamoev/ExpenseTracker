import React from 'react'
import { Link } from 'react-router-dom';

const Home: React.FunctionComponent = () => {
    return (
        <div>

            Let's Manage your <Link to="/transactions">Transactions</Link> Or Create <Link to='/categories'>Categories</Link>

        </div>
    )
}

export default Home;