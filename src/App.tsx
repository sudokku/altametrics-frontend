import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './components/shared/ProtectedRoutes';
import Navbar from './components/Navbar';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import BillsDashboard from './features/bills/BillsDashboard';
import Home from './components/Home';
import InvoicesDashboard from './features/invoices/InvoicesDashboard';


function App() {
  return (
    <div className="App max-w-4xl m-auto">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path='/' />
            <Route element={<BillsDashboard />} path='/bills' />
            <Route element={<InvoicesDashboard />} path='/invoices' />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<h1 className='text-2xl mt-8 font-bold text-center'>Not Found</h1>} path="*" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;