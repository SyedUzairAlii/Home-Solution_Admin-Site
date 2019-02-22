import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './components/home';
import Dashboard from './screens/Dashboard/dashboard';
import history from "./history";
import  loginn from "./screens/login/login"

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={loginn} />
                    <Route exact path="/Dashboard" component={Dashboard} />
                </div>
            </Router>
        )
    }
}

export default Routers;