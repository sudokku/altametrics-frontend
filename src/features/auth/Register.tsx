import { FormEvent, useState } from "react";
import { useRegisterMutation } from "../../app/apiSlice";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [useRegister] = useRegisterMutation();
    const [credentials, setCredentials] = useState({ email: '', password: '', name: '' });
    const errors = {
        email: credentials.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null ? 'Invalid email' : '',
        password: credentials.password.length < 6 ? 'Password must be at least 6 characters' : ''
    };
    const isValidForm = errors.email === '' && errors.password === '';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await useRegister(credentials).unwrap();
            dispatch(login({ token: response.token, user: response.user }));
            navigate('/');
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div className='flex min-h-full max-w-md m-auto flex-col justify-center align-baseline px-6 py-12 space-y-4'>
            <h3 className='font-semibold text-2xl text-center'>Register</h3>
            <form onSubmit={(e) => handleRegister(e)}>
                <input
                    name='email'
                    type="email"
                    autoComplete='email'
                    className='block w-full rounded border border-gray-200 px-3 py-1.5 mt-4'
                    value={credentials.email}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Email"
                    required
                />
                {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                <input
                    name="name"
                    type="text"
                    className='block w-full rounded border border-gray-200 px-3 py-1.5 mt-4'
                    value={credentials.name ?? ''}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Name"
                />
                <input
                    name='password'
                    type="password"
                    className='block w-full rounded border border-gray-200 px-3 py-1.5 mt-4'
                    value={credentials.password}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Password"
                    required
                />
                {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
                <button
                    className='block mx-auto mt-6 w-32 bg-indigo-600 text-white rounded px-3 py-1.5 font-semibold'
                    disabled={!isValidForm}
                >Register</button>
            </form>
        </div>
    );
};

export default Register;