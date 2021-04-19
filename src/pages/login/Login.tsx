import React, {ChangeEvent, FormEvent, useState} from "react";
import useAuth from "../../data/AuthContext";
import {login} from "../../api/auth.service";
import {useHistory} from "react-router-dom";

export const Login = () => {

    const [loginData, setLoginData] = useState<{ email?: string, password?: string }>({
        email: undefined,
        password: undefined
    });
    const [loading, setLoading] = useState(false);
    const {loginUser} = useAuth();
    const history = useHistory();

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setLoginData({...loginData, [name]: value})
    }

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        login(loginData.email, loginData.password)
            .then((resp) => {
                console.log(resp);
                setLoading(false)
                loginUser(resp.token)
                history.push('/')
            })
    }


    return (
        <div className={"min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"}>
            <div className="max-w-sm w-full space-y-8">
                <div>
                    <h3 className="font-bold text-2xl uppercase">Report System</h3>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
                                placeholder="Email address"
                                required
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
                                required
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type='submit'
                            disabled={loading}
                            className={"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                    <div>
                        <div className="text-sm">
                            No account? Click
                            <a href="signup" className="px-1 font-bold lg:hover:underline">
                                here
                            </a>
                            to sign up!
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
