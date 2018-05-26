import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/' exact component={Home} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
