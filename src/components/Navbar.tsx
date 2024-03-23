import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='flex justify-between'>
            <Link to={'/'}><h1>Accounting App</h1></Link>
            <ul className='flex gap-4'>
                <li>
                    <Link to={"/bills"}>Bills</Link>
                </li>
                <li>
                    <Link to={"/invoices"}>Invoices</Link>
                </li>
                <li>
                    <Link to={"/me"}>Account</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;