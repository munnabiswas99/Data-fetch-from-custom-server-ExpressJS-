import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Main.jsx';
import Laptops from './components/Laptops.jsx';
import Laptop from './components/Laptop.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/phones',
        element: <Laptops></Laptops>,
        loader: () => fetch('http://localhost:3000/laptops')
      },
      {
        path: '/laptop/:id',
        element: <Laptop></Laptop>,
        loader: ({params}) => fetch(`http://localhost:3000/laptops/${params.id}`)
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
