// PrivateRoute.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Make sure this path is correct to the AuthContext

function PrivateRoute({ children }) {
  const { auth, clientInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !clientInfo) {
      navigate("/login");
    }
  }, [auth, clientInfo, navigate]);

  return auth && clientInfo ? children : null;
}

export default PrivateRoute; // Ensure to export the PrivateRoute function
