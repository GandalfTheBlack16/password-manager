import { RouterProvider } from "react-router-dom"
import { router } from "./Router.tsx";
import { Toaster } from "react-hot-toast";

import './App.css'

function App() {
  return (
    <>
      <RouterProvider router={router}/>
      <Toaster 
        position="bottom-center"
      />
    </>
  )
}

export default App
