import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [bluriness, setBulriness] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Func: request api, if successful, save the jwt-token in localStorage
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('http://localhost:3000/api/v2/users', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.status === 200) {
            localStorage.setItem('lemo_token', response.data.data);
            navigate('/');
        }
    };

    return (
        <div className="wh-full flex-c-c login-bg m0 p0">
            <div className={`absolute z-0 wh-full transform duration-500 ${bluriness}`}></div>
            <div className='absolute z-10 wh-full bg-black op-20'></div>
            <div
                className="relative z-20 flex-col flex-c-c bg-[#ffffffff] p15"
                onMouseOver={() => {setBulriness('backdrop-blur-10')}}
                onMouseOut={() => {setBulriness('')}}
            >
                <div className="flex items-center mb-8">
                    <h2 className="m0 font-extrabold text-9 font-sans text-[#4aab1fff]">
                        Student Manager
                    </h2>
                </div>
                <form
                    className="flex-col justify-center mb10"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="w-70 p3 mb6 text-[#444444ff] text-4 border-solid border-1 border-[#aaaaaaff] hover:border-[#4aab1fff] focus:border-[#4aab1fff] focus:outline-none"
                        type="text"
                        placeholder={`Username`}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        className="w-70 p3 mb7 text-[#444444ff] text-4 border-solid border-1 border-[#aaaaaaff] hover:border-[#4aab1fff] focus:border-[#4aab1fff] focus:outline-none"
                        type="password"
                        placeholder={`Password`}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        className="w-77 p2 h12 text-4 border-none bg-[#4aab1fff] hover:bg-[#4a891fff] text-[#fff] cursor-pointer"
                        type="submit"
                        value={`Log In`}
                    />
                </form>
                <div className='h-fit w-full mb10'>
                    <div className='h-.3 w-full bg-[#ddd]'></div>
                    <div className='absolute left-1/2 transform translate--1/2 text-3.5 text-[#888] bg-white px2 font-sans'>
                        OR
                    </div>
                </div>
                <div
                    className='h-12 w-full box-border flex cursor-pointer border-solid border-3 bg-[#4aab1fff] hover:bg-[#4a891fff] border-[#4aab1fff] hover:border-[#4a891fff]'
                    onClick={() => {console.log("Not currently supported")}}
                >
                    <div className='h-full w-11 flex-c-c bg-white'>
                        <img src='./google.png' className='w6'></img>
                    </div>
                    <div className='flex-c-c h-full flex-1 font-sans text-[#fff]'>
                        Log In with Google
                    </div>
                </div>
            </div>
        </div>
    );
}
