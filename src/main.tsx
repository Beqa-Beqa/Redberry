import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App.tsx';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import FilterContextProvider from './Contexts/FilterContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </StrictMode>,
)
