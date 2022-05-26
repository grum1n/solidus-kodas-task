import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '.';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Dashboard from '../pages/autorized/Dashboard';

function Router() {

    return (
        <Routes>
            <Route path={ROUTES.PUBLIC_DEFAULT} element={<Home />}/>
            <Route path={ROUTES.PUBLIC_LOGIN} element={<Login />}/>
            <Route path={ROUTES.PUBLIC_REGISTER} element={<Register />}/>
            <Route path={ROUTES.AUTORIZED_USERS_DASHBOARD} element={<Dashboard />}/>
        </Routes>
    )
}

export default Router;