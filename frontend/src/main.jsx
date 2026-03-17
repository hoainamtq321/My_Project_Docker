import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from "./stores/store.js";
import { CartProvider } from './context/CartContext';
 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </StrictMode>,
)
