import React, {Fragment} from "react";
import useAuth from "../../data/AuthContext";
import {Link, useHistory} from "react-router-dom";
import {cache} from 'swr';

const Navbar = () => {

    const {isLoggedIn, logoutUser} = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logoutUser();
        cache.clear();
        history.push('/login', {})
    }

    if (!isLoggedIn) {
        return (<Fragment/>)
    }

    return (

        <nav className={'flex max-w-full h-12 shadow-sm justify-between items-center bg-gray-200'}>
            <div>
                <Link to={"/"}>
                    <h3 className={"mx-4 font-bold text-lg"}>Report System</h3>
                </Link>
            </div>

            <div className={'flex'}>
                <div className={"mx-2"}>
                    <button
                        onClick={handleLogout}
                        className={'bg-gray-500 px-5 py-1 rounded-md text-white'}
                    >
                        Logout
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;
