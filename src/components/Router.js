import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";


const AppRouter = ({ isLoggedIn }) => {

    return (
        <Router>
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path="/">
                    <Home/>
                </Route> 
                </> : 
                
                <Route exact path="/">
                    <Auth/>
                </Route>
                }
            </Switch>
        </Router>
    )
}

//Fragment 많은 요소들을 렌더링 하고 싶을 때 사용한다. 

export default AppRouter;