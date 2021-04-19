import React, {FunctionComponent} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import useAuth from "../data/AuthContext";

export const ProtectedRoute: FunctionComponent<RouteProps> = (props) => {
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return <Route {...props} component={props.component}/>;
}
