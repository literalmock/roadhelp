import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import About from './pages/About'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { ThemeProvider } from './components/theme-provider'
import { User } from 'lucide-react'
import UserPage from './pages/UserPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useUser } from '@clerk/clerk-react'
import FindHelpPage from './pages/FindHelpPage'

function App() {
  const {isSignedIn} = useUser();
  const router = createBrowserRouter([
    {
    element: <AppLayout/>,
    children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
    {
      path: '/user',
      element:(
        <ProtectedRoute>
        <UserPage />
        </ProtectedRoute> 
      )
    },
     {
      path: '/find-help',
      element:(
        <ProtectedRoute>
        <FindHelpPage />
        </ProtectedRoute> 
      )
    },
  ]
}
  ])
  return (
    <>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
    </ThemeProvider>
    </>
  )
}

export default App
