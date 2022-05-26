import React, { useState } from 'react';
import Img from '../../images/loginandregister.jpg';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Login() {
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        event.persist();
        setLogin({ ...loginInput, [event.target.name]: event.target.value  });
    }

    const loginSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_email', res.data.useremail);
                    swal('Success', res.data.message, 'success');
                    navigate('/autorized/dashboard');
                } else if(res.data.status === 401) {
                    swal('Warning', res.data.message, 'warning');
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
        });

    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={Img} alt='login'/>
            </div>
            <div className='bg-gray-100 flex flex-col justify-center'>
                <form onSubmit={loginSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4'>
                    <div className='flex flex-col py-2'>
                        <label>Email</label>
                        <input type='email' name='email' onChange={handleInput} value={loginInput.email}  className='border p-2'/>
                        <span>{loginInput.error_list.email}</span>
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input type='password' name='password' onChange={handleInput} value={loginInput.password} className='border p-2'/>
                        <span>{loginInput.error_list.password}</span>
                    </div>
                    <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Login</button>
                    <div className='flex justify-between'>
                        <Link to='/'  className='hover:text-cyan-600'>Home page</Link>
                        <Link to='/public/register'  className='hover:text-cyan-600'>Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;