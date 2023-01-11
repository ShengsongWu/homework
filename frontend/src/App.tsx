import React, { FC } from 'react';
import 'antd/dist/reset.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Form } from '@/pages/form';
import { Home } from '@/pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'form/:id',
    element: <Form />
  }
]);

const App: FC = () => <RouterProvider router={router} />;

export default App;
