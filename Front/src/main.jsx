import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './providers/UserContext'
// import { TechProvider } from './providers/TechContext.jsx'
import { ContactsListProvider } from './providers/ContactsListContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

        <UserProvider>
          <ContactsListProvider>
            <App />  
          </ContactsListProvider>
        </UserProvider>

    </BrowserRouter>
  </React.StrictMode>,
)
