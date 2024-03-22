import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './components/shared/ProtectedRoutes';
import Login from './features/auth/Login';
import Register from './features/auth/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>

          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;