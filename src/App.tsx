import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { Header } from './components/header/Header';
import { Footer } from "./components/footer/Footer.tsx";
import { Login } from './components/login/Login.tsx'
import { loginStore } from "./stores/loginStore.ts";

import './App.css'
import { Vaults } from "./components/vaults/Vaults.tsx";

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <RootPageLoader />
  },
  {
    path: '/vaults',
    Component: Vaults,
  },
  {
    path: '/login',
    element: <LoginPageLoader />,
  }
])

function RootPageLoader () {
  const isLogged = loginStore(state => state.isLogged)
  return (
    !isLogged ? <Navigate to={'/login'} /> : <Navigate to={'/vaults'} />
  )
}

function LoginPageLoader () {
  const isLogged = loginStore(state => state.isLogged)
  return (
    isLogged ? <Navigate to={'/vaults'} /> : <Login />
  )
}

function App() {

  const logged = loginStore((state) => state.isLogged)

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
