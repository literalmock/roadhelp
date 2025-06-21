import React, { createContext, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';

// 1️⃣ Create context
const AuthContext = createContext();

// 2️⃣ Provider that uses Clerk's hook internally
export const AuthProvider = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <AuthContext.Provider value={{ isLoggedIn: isSignedIn, user, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom hook for convenience
export const useAuthContext = () => useContext(AuthContext);
