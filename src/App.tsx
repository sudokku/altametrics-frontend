import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './components/shared/ProtectedRoutes';
import Navbar from './components/Navbar';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import BillsDashboard from './features/bills/BillsDashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<BillsDashboard />} path='/bills' />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<h1>Not Found</h1>} path="*" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;