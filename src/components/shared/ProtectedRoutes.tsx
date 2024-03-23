import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../../app/store'

const PrivateRoutes = () => {
    const auth = useSelector((state: RootState) => state.auth);

    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes