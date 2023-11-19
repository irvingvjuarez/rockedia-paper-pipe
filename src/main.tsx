import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import router from './routing/router.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from './components/ErrorHandler.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
)
