import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'

const GOOGLE_CLIENT_ID = "785116831592-9v8ehortrlc4rqs6oj412nkcdtdsjljb.apps.googleusercontent.com";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = {GOOGLE_CLIENT_ID}>
     <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
