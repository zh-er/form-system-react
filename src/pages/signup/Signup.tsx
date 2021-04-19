import React, {ChangeEvent, FormEvent, useState} from "react";
import {signUp} from "../../api/auth.service";
import useAuth from "../../data/AuthContext";


export const Signup = () => {
    const [loginData, setLoginData] = useState<{ email?: string, password?: string, username?: string, confirmedPassword?: string }>({
        email: undefined,
        password: undefined
    });

    const [loading, setLoading] = useState(false);

    const {loginUser} = useAuth();

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setLoginData({...loginData, [name]: value})
    }

    const handleSignUp = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        console.log(loginData);

        if (loginData.confirmedPassword === loginData.password) {
            console.log('here')
            signUp(loginData.email, loginData.password, loginData.username)
                .then((resp) => {
                    console.log(resp)
                    loginUser(resp.token);
                    setLoading(false);
                })
        } else {
            setLoading(false);
        }


    }

    return <div className={"min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"}>
        <div className="max-w-sm w-full space-y-8">
            <div className="text-center">
                <h3 className="font-bold text-2xl uppercase">Sign Up</h3>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
                            placeholder="Email address"
                            required
                            onChange={handleFormChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Username
                        </label>
                        <input
                            name="username"
                            type="name"
                            autoComplete="username"
                            className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
                            placeholder="Username"
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
                            placeholder="Password"
                            className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
                            required
                            onChange={handleFormChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">
                            Confirm Password
                        </label>
                        <input
                            name="confirmedPassword"
                            type="password"
                            placeholder="Confirm password"
                            className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
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
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    </div>
}
