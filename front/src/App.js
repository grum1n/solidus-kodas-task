import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';
import './styles/main.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
       <BrowserRouter>
            <Router/>
       </BrowserRouter>
    )
}

export default App;
