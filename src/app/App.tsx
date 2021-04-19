import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {Entries} from "../pages/entries/Entries";
import {Login} from "../pages/login/Login";
import {Signup} from "../pages/signup/Signup";
import {AuthContext} from '../data/AuthContext';
import {Report, ReportWithId} from "../pages/report/Report";
import {ProtectedRoute} from "../routes/ProtectedRoute";
import {ReportMode} from "../models/Report.model";
import Navbar from "../components/navbar/Navbar";
import {useProvideAuth} from "../data/useProvideAuth";

function App() {

    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>

            <div className="bg-gray-100 h-screen">
                <Navbar/>
                <Switch>
                    <ProtectedRoute exact path='/'>
                        <Entries/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path='/entry/create'>
                        <Report mode={ReportMode.CREATE}/>
                    </ProtectedRoute>
                    <ProtectedRoute path='/entry/:id'>
                        <ReportWithId/>
                    </ProtectedRoute>
                    <Route path='/login'>
                        <Login/>
                    </Route>
                    <Route path='/signup'>
                        <Signup/>
                    </Route>
                    <Route path='*'>
                        Page not found :(
                    </Route>
                </Switch>
            </div>

        </AuthContext.Provider>
    );
}

export default App;
