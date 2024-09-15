import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App.tsx';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import FilterContextProvider from './Contexts/FilterContext.tsx';
import GeneralContextProvider from './Contexts/GeneralContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeneralContextProvider>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </GeneralContextProvider>
  </StrictMode>,
)
