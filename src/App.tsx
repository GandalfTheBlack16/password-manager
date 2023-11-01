import { RouterProvider } from "react-router-dom"
import { Header } from './components/header/Header';
import { Footer } from "./components/footer/Footer.tsx";
import { loginStore } from "./stores/loginStore.ts";
import { router } from "./Router.tsx";

import './App.css'

function App() {

  const { isLogged } = loginStore()

  return (
    <>
      <Header
        isLogged={isLogged}
      />
      <main>
        <RouterProvider router={router}/>
      </main>
      <Footer />
    </>
  )
}

export default App
