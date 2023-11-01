import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import { AuthPageLayout } from "./layouts/AuthPageLayout"; 
import { Vaults } from "./components/vaults/Vaults";
import Login from "./components/login/Login";
import { PublicPageLayout } from "./layouts/PublicPageLayout";
import { Account } from "./components/account/Account";
import { useAuthStore } from "./hooks/useAuthStore";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={'/login'} replace/>
    },
    {
      path: '/vaults',
      element: <AuthPageLayout><Vaults /></AuthPageLayout>,
    },
    {
      path: '/account',
      element: <AuthPageLayout><Account /></AuthPageLayout>
    },
    {
      path: '/login',
      element: <PublicPageLayout><Login /></PublicPageLayout>,
    },
    {
      path: '/logout',
      loader: logoutLoader
    }
])

function logoutLoader () {
  useAuthStore.getState().logout()
  return redirect('/')
}