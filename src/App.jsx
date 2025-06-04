// src/App.jsx
import { Box } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Navbar from './components/Navbar';
import APOD from './pages/APOD';
import Planets from './pages/Planets';
import ISRO from './pages/ISRO';
import SolarSystem from './pages/SolarSystem';
import BuildSolarSystem from './pages/BuildSolarSystem';
import RocketSimulator from './pages/RocketSimulator';
import AsteroidDodging from './pages/AsteroidDodging';
import Login from './Login';
import Signup from './Signup';
import AboutMe from './pages/AboutMe';
import HomePage from './pages/HomePage';


// 🔐 Wrapper for protected routes
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Box p={6}>Loading...</Box>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Box minH="100vh" bg="gray.900" color="white">
      <Navbar />
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        
        <Route
          path="/apod"
          element={
            <PrivateRoute>
              <APOD />
            </PrivateRoute>
          }
        />
        <Route
          path="/planets"
          element={
            <PrivateRoute>
              <Planets />
            </PrivateRoute>
          }
        />
        <Route
          path="/isro"
          element={
            <PrivateRoute>
              <ISRO />
            </PrivateRoute>
          }
        />
        <Route
          path="/solar-system"
          element={
            <PrivateRoute>
              <SolarSystem />
            </PrivateRoute>
          }
        />
        <Route
          path="/build-your-own"
          element={
            <PrivateRoute>
              <BuildSolarSystem />
            </PrivateRoute>
          }
        />
        <Route
          path="/rocket-simulator"
          element={
            <PrivateRoute>
              <RocketSimulator />
            </PrivateRoute>
          }
        />
        <Route
          path="/asteroid-dodging"
          element={
            <PrivateRoute>
              <AsteroidDodging />
            </PrivateRoute>
          }
        />

         <Route
  path="/"
  element={
    <PrivateRoute>
      <HomePage />
    </PrivateRoute>
  }
/>

       
        <Route
  path="/about"
  element={
    <PrivateRoute>
      <AboutMe />
    </PrivateRoute>
  }
/>

      </Routes>
    </Box>
  );
}

export default App;
