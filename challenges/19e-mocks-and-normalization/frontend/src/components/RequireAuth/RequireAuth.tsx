import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from 'features/auth/authSlice';

const RequireAuth = ({ allowedRoles }) => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  // If the user has sufficient permissions let him/her through
  return user?.permissionLevel & allowedRoles ? (
    <Outlet />
  ) : token ? (
    // Authenticated but without authorization to visit the route.
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    // In case the user is not authenticated
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
