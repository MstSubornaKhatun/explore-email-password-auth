import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './components/layouts/Root.jsx';
import Home from './components/Home/Home.jsx';
import login from './components/login/login.jsx';
import Register from './components/Register/Register.jsx';
import SignUp from './components/SignUp/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {index:true, Component: Home},
      {path: "login", Component: login},
      {path: "register", Component: Register},
      {path: 'signUp', Component: SignUp}
    ]

   
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
