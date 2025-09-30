import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userData = localStorage.getItem('userData');

  if (!isAuthenticated || !userData) {
    return <Navigate to="/signin" replace />;
  }

  if (requireAdmin) {
    try {
      const user = JSON.parse(userData);
      if (user.role !== 'admin') {
        return <Navigate to="/home" replace />;
      }
    } catch {
      return <Navigate to="/signin" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
