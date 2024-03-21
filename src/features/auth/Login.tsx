import { useState } from 'react';
import { useLoginMutation } from '../../app/apiSlice';
import { login } from './authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [useLogin] = useLoginMutation();

    const handleLogin = async () => {
        console.log();
        try {
            const response = await useLogin({ email, password }).unwrap();
            login({ token: response.token, user: response.user });
            console.log(response);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;