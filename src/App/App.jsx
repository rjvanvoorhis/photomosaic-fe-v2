import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import {ValidatePage} from '../Validate';
import {RegisterPage} from '../Register';
import './index.css'

class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/validate" component={ValidatePage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

export { App };
