import React, { useEffect, Suspense, lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Home from "../pages/home/home";
import User from "../pages/user/user";
import Drug from "../pages/drug/drug";
import Hospitals from "../pages/Hospitals/Hospitals";
import Doctors from "../pages/Doctors/Doctors";
import Login from "../pages/login/login";
import Pharmacies from "../pages/Pharmacies/Pharmacies";
import About from "../pages/About/About";
import Yuyue from "../pages/yuyue/yuyue";
import Medicines from "../pages/Medicines/Medicines";
import Communacation from "../pages/Communacation/Communacation";
import { message } from 'antd';

const requireAuth = (component, isAuthenticated) => {
  return isAuthenticated ? component : <Navigate to="/login" replace />;
};

const Router = ({ isAuthenticated }) => {
  const routes = useRoutes([
    {
      path: '/',
      element: requireAuth(<About />, isAuthenticated),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
      path: '/yuyue',
      element: requireAuth(<Yuyue />, isAuthenticated),
    },
    {
        path: '/medicines',
        element: <Medicines />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/user',
        element: <User />,
    },
    {
        path: '/drug',
        element: <Drug />,
    },
    {
        path: '/doctors',
        element: <Doctors />,
    },
    {
        path: '/hospitals',
        element: <Hospitals />,
    },
    {
        path: '/parmacies',
        element: <Pharmacies />,
    },
    {
      path: '/communacation',
      element: requireAuth(<Communacation />, isAuthenticated)
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return  (
    <>
      {routes}
    </>
  );
};

export default Router;

