import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '.';
import Login from '../components/Login';
import Register from '../components/Register';
import UsersList from '../components/UsersList';

function Router() {
    return (
        <Routes>
            <Route path={ROUTES.PUBLIC_LOGIN} element={<Login />}/>
            <Route path={ROUTES.PUBLIC_REGISTER} element={<Register />}/>
            <Route path={ROUTES.AUTORIZED_USERS_LIST} element={<UsersList />}/>
        </Routes>
    )
}

export default Router;