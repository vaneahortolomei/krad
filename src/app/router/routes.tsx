import React from 'react';
import { App } from '../app';
import { BaseTemplate } from '@/templates/base';
import { Home } from '@/pages/Home';
import { Contact } from '@/pages/Contact';
import { Login } from '@/pages/Login';

export const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <BaseTemplate />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'contact',
            element: <Contact />
          }
        ]
      }
    ]
  }
];
