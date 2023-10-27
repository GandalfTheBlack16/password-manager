import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { Header } from './components/header/Header';
import { Footer } from "./components/footer/Footer.tsx";
import { Login } from './components/Login.tsx'
import { useState } from "react"

import './App.css'

const router = createBrowserRouter([
  {
      path: '/',
      element: <Navigate to={"/login"}/> 
  },
  {
      path: '/login',
      element: <Login />
  }
])

function App() {

  const [ logged ] = useState<boolean>(true)

  return (
    <>
      <Header
        isLogged={logged}
      />
      <main>
        <RouterProvider router={router}/>
      </main>
      <Footer />
    </>
  )
}

export default App
