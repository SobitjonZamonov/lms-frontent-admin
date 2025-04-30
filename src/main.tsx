import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import QueryProviderComponent from './providers/QueryProviderComponent.tsx';
import './index.css'
import "../src/assets/css/index.css"
import "./utils/i18n/i18n.ts"
createRoot(document.getElementById('root')!).render(
  <QueryProviderComponent>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryProviderComponent>

)
