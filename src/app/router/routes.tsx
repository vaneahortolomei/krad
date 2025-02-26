import React from 'react';
import { App } from '../app';
import { BaseTemplate } from '@/templates/base';
import { Home } from '@/pages/Home';
import { Contact } from '@/pages/Contact';
import { RegisterPage } from '@/pages/Auth/Register';
import { LoginPage } from '@/pages/Auth/Login';
import { AuthOnlyRoute } from '@/app/router/components/AuthOnlyRoute';
import { ProtectedRoute } from '@/app/router/components/ProtectedRoute';

export const routes = [
  {
    element: <AuthOnlyRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> }
    ]
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            element: <BaseTemplate />,
            children: [
              { index: true, element: <Home /> },
              { path: 'contact', element: <Contact /> }
            ]
          }
        ]
      }
    ]
  }
];
