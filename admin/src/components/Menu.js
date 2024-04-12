import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  LogoutOutlined, 
} from '@ant-design/icons';
import '../styles/components/menu.scss';

export const Menu = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <div className="item">
        <span className="title">MAIN</span>
        <Link to="/dashboard" className={`listItem ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <DashboardOutlined />
          <span className="listItemTitle">Dashboard</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">LISTS</span>
        <Link to="/users" className={`listItem ${location.pathname === '/users' ? 'active' : ''}`}>
          <UserOutlined />
          <span className="listItemTitle">Users</span>
        </Link>
        <Link to="/products" className={`listItem ${location.pathname === '/products' ? 'active' : ''}`}>
          <ShoppingCartOutlined />
          <span className="listItemTitle">Products</span>
        </Link>
        <Link to="/orders" className={`listItem ${location.pathname === '/orders' ? 'active' : ''}`}>
          <ShoppingOutlined />
          <span className="listItemTitle">Orders</span>
        </Link>
        <Link to="/employee" className={`listItem ${location.pathname === '/employee' ? 'active' : ''}`}>
          <UsergroupAddOutlined />
          <span className="listItemTitle">Employee</span>
        </Link>
      </div>
    </div>
      <div className="itemLogout">
        <Link to="/" className={`listItem ${location.pathname === '/' ? 'active' : ''}`}>
          <LogoutOutlined  />
          <span className="listItemTitle">Logout</span>
        </Link>
      </div>
  );
};
