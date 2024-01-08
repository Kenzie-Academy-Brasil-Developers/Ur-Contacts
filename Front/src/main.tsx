import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import { UserProvider } from './providers/UserContext.js'
import { ContactsListProvider } from './providers/ContactsListContext.js'

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
