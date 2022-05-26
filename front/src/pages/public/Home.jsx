import React from 'react';
import Img from '../../images/loginandregister.jpg';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={Img} alt='login'/>
            </div>
            <div className='bg-gray-100 flex flex-col justify-center'>
                <div className='max-w-[400px] w-full mx-auto bg-white p-4'>
                    <div className='flex justify-between'>
                        <Link to='/public/login' className='hover:text-cyan-600'>Login</Link>
                        <Link to='/public/register' className='hover:text-cyan-600'>Create an account</Link>
                    </div>
                    <h2 className='text-4xl font-bold text-center py-6'>Users List</h2>
                    <div className='flex flex-col py-2 border p-2 m-1'>
                        user a
                    </div>
                    <div className='flex flex-col py-2 border p-2 m-1'>
                        user b
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;