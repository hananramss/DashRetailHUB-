import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Products';
import { Users } from './pages/Users';
import { Orders } from './pages/Orders';
import { IncomeChart } from './components/Chart/IncomeChart';
import { SalesChart } from './components/Chart/SalesChart';
import { ExpensesChart } from './components/Chart/ExpensesChart';
import { Navbar } from './components/Navbar';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';

import './styles/main/main.scss';

const Layout = () => {
  
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const App = () => {

  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Public routes */}
        <Route path="https://dashretailhub.netlify.app/register" element={<Register />} />
        <Route path="https://dashretailhub.netlify.app/login" element={<Login/>} />
        
        {/* Default route to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Private routes */}
        <Route element={<Layout />}>
          <Route path="https://dashretailhub.netlify.app/dashboard" element={<Dashboard />} />
          <Route path="https://dashretailhub.netlify.app/products" element={<Products />} />
          <Route path="https://dashretailhub.netlify.app/users" element={<Users />} />
          <Route path="https://dashretailhub.netlify.app/orders" element={<Orders />} />
          <Route path="https://dashretailhub.netlify.app/incomeChart" element={<IncomeChart />} />
          <Route path="https://dashretailhub.netlify.app/salesChart" element={<SalesChart />} />
          <Route path="https://dashretailhub.netlify.app/expensesChart" element={<ExpensesChart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
