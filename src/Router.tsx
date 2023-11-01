import { createBrowserRouter } from "react-router-dom";
import { AuthPageLayout } from "./layouts/AuthPageLayout"; 
import { Vaults } from "./components/vaults/Vaults";
import Login from "./components/login/Login";
import { RedirectAuthLayout } from "./layouts/RedirectAuthLayout";

export const router = createBrowserRouter([
    {
      path: '/vaults',
      element: <AuthPageLayout><Vaults /></AuthPageLayout>,
    },
    {
      path: '/login',
      element: <RedirectAuthLayout><Login /></RedirectAuthLayout>,
    }
])