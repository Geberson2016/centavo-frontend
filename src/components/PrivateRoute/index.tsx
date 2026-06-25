import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../../utils/auth';

export function PrivateRoute() {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
