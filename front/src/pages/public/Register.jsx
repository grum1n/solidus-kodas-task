import React, { useState } from 'react';
import Img from '../../images/loginandregister.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Register() {
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        event.persist();
        setRegister({ ...registerInput, [event.target.name]: event.target.value });
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_email', res.data.useremail);
                    swal('Success', res.data.message, 'success');
                    navigate('/autorized/dashboard');
                }else {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            
            });
        });
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={Img} alt='register'/>
            </div>
            <div className='bg-gray-100 flex flex-col justify-center'>
                <form  onSubmit={registerSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4'>
                
                    <div className='flex flex-col py-2'>
                        <label>Name</label>
                        <input type='text' name='name' onChange={handleInput} value={registerInput.name} className='border p-2' />
                        <span>{registerInput.error_list.name}</span>
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Email</label>
                        <input type='email' name='email' onChange={handleInput} value={registerInput.email} className='border p-2' />
                        <span>{registerInput.error_list.email}</span>
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input type='password' name='password' onChange={handleInput} value={registerInput.password} className='border p-2' />
                        <span>{registerInput.error_list.password}</span>
                    </div>
                    <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Register</button>
                    <div className='flex justify-between'>
                        <Link to='/'  className='hover:text-cyan-600'>Home page</Link>
                        <Link to='/public/login'  className='hover:text-cyan-600'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;