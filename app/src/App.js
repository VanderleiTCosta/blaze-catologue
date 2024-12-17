// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Container from './Components/Container/Container';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BlazeProvider } from './context/BlazeContext';
import DashBlaze from './Components/Dashboard/Blaze/DashBlaze';
import Admin from "./Components/Admin/Admin";
import PrivateRoute from "./Components/PrivateR/PrivateRoute"; // Ensure this path is correct
import Espelhar from './Components/Espelhar/Espelhar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlazeProvider>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Container><Home /></Container></PrivateRoute>} />
                <Route path="/dashblaze" element={<DashBlaze />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/teste" element={<Espelhar />} />
                <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
            </div>
        </BlazeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
