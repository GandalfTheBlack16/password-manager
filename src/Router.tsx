import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import { AuthPageLayout } from "./layouts/AuthPageLayout"; 
import { Vaults } from "./components/vaults/Vaults";
import Login from "./components/login/Login";
import { PublicPageLayout } from "./layouts/PublicPageLayout";
import { Account } from "./components/account/Account";
import { useAuthStore } from "./hooks/stores/useAuthStore";
import { CredentialForm } from "./components/vaults/credential/CredentialForm";
import { useVaultStore } from "./hooks/stores/useVaultStore";
import { ChangeCredentialForm } from './components/account/credentials/ChangeCredentialForm';
import { RestorePasswordForm } from "./components/login/RestorePasswordForm";

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
      path: '/vaults/credentials',
      element: <AuthPageLayout><CredentialForm /></AuthPageLayout>
    },
    {
      path: '/account',
      element: <AuthPageLayout><Account /></AuthPageLayout>
    },
    {
      path: '/account/password',
      element: <AuthPageLayout><ChangeCredentialForm /></AuthPageLayout>
    },
    {
      path: '/login',
      element: <PublicPageLayout><Login /></PublicPageLayout>,
    },
    {
      path: '/signup',
      element: <PublicPageLayout><Login signUp={true} /></PublicPageLayout>
    },
    {
      path: '/restore-password',
      element: <PublicPageLayout hiddenFooter><RestorePasswordForm /></PublicPageLayout>
    },
    {
      path: '/logout',
      loader: logoutLoader
    }
])

function logoutLoader () {
  useAuthStore.getState().logout()
  useVaultStore.getState().clearVaults()
  return redirect('/')
}