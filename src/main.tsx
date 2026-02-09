import { CustomThemeProvider } from './components/CustomThemeProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </CustomThemeProvider>
  </StrictMode>,
);
