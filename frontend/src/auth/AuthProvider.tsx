import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

// Auth0 configuration
const AUTH0_DOMAIN = 'dev-3hp0ceoh0uimazrc.us.auth0.com'
const AUTH0_CLIENT_ID = 'WNQazG73VLIhCnY80nGYO1nWfZsRHpll'
const AUTH0_AUDIENCE = 'https://desilingo-api.com'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || '/dashboard')
  }

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0_AUDIENCE
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
} 