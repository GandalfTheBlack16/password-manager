import { RouterProvider } from "react-router-dom"
import { Footer } from "./components/footer/Footer.tsx";
import { router } from "./Router.tsx";

import './App.css'

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <Footer />
    </>
  )
}

export default App
