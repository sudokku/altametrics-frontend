import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');
    }

    return (
        <nav className='flex justify-between py-4'>
            <Link to={'/'}><h5 className='text-lg font-bold'>Accounting App</h5></Link>
            {auth.token ?
                (<ul className='flex gap-4'>
                    <li>
                        <Link to={"/bills"}>Bills</Link>
                    </li>
                    <li>
                        <Link to={"/invoices"}>Invoices</Link>
                    </li>
                    <li>
                        <Link to={"/me"}>Account</Link>
                    </li>
                    <li>
                        <a href="#" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>) : (<ul className='flex gap-4'>
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                    <li>
                        <Link to={"/register"}>Register</Link>
                    </li>
                </ul>)
            }
        </nav>
    );
};

export default Navbar;