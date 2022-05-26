import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';
import Img from '../../images/loginandregister.jpg';

function Dashboard() {
    const [Authenticated, setAuthenticated] = useState(false);
    const [srcQrcode, setSrcQrcode] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth_token')){
            axios.get(`/api/checkingAuthenticated`).then(res => {
                if (res.status === 200){
                    setAuthenticated(true);
                    const showUser = localStorage.getItem('auth_name');
                    const showEmail = localStorage.getItem('auth_email');
                    QRCode.toDataURL(`Profile name : ${showUser}. Contact : ${showEmail}`).then((data) => {
                        setSrcQrcode(data);
                    })
                }
            });
        }else {
            navigate('/public/login');
        }
       
        return () => {
            setAuthenticated(false);
        }
    }, [])
    
    const logoutSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/logout').then(res => {
            if(res.data.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_email');
                navigate('/');
            }
        });
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={Img} alt='register'/>
            </div>

            {
                Authenticated ? (
                    <div className='bg-gray-100 flex flex-col justify-center'>
                        <div className='max-w-[400px] w-full mx-auto flex flex-col bg-white p-4 gap-4'>
                            <button type='button' onClick={logoutSubmit} className='text-white btn bg-indigo-500 py-2 px-9 rounded hover:bg-cyan-600' >Logout</button>
                            <div className='flex flex-col py-2 border p-2 m-1'>
                                <img src={srcQrcode} className='w-500 h-500' alt='qr codas' />
                            </div>
                        </div>
                    </div>

                ) : 'Checking authentication'
            }

        </div>
    );
}

export default Dashboard;