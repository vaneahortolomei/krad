import React from 'react';
import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { App } from './app/app';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
