import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    // Optional: show spinner or placeholder
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    // If not signed in, redirect to homepage with sign-in flag
    return <Navigate to={`/?sign-in=true`} state={{ from: location }} replace />;
  }

  // If signed in, render protected children
  return <>{children}</>;
};

export default ProtectedRoute;
