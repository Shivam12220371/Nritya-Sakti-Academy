import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'

// Set the global default base URL for all API requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '669212026813-r2bk1lh0k1474kole9t35183ndjr4di0.apps.googleusercontent.com';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
