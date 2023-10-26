import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { Login } from './components/Login.tsx'
import { useState } from "react"
import { FiUnlock, FiLogOut, FiUser } from 'react-icons/fi'
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

  const [ logged ] = useState<boolean>(false)

  return (
    <main>
      <nav>
        <header>
          <h1>Password Manager</h1>
          <span>&ldquo;Keep safe your passwords&rdquo;</span>
        </header>
        {
          logged &&
          <section className="main_menu">
            <div>
              <FiUnlock />
              <span>Vaults</span>
            </div>
            <div className="selected">
              <FiUser />
              <span>My Account</span>
            </div>
            <div>
              <FiLogOut /> 
              <span>Logout</span>
            </div>
          </section>
        }
      </nav>
      <RouterProvider router={router}/>
    </main>
  )
}

export default App
