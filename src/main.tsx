import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App.tsx';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import FilterContextProvider from './Contexts/FilterContext.tsx';
import GeneralContextProvider from './Contexts/GeneralContext.tsx';
import PageContextProvider from './Contexts/PageContext.tsx';
import RealEstateContextProvider from './Contexts/RealEstateContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageContextProvider>
      <GeneralContextProvider>
        <RealEstateContextProvider>
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
        </RealEstateContextProvider>
      </GeneralContextProvider>
    </PageContextProvider>
  </StrictMode>,
)
