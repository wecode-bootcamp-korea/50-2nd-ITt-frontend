import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.scss';

const HEADER_EXCEPTIONAL_PATHS = [
  '/login',
  '/payment',
  '/pay-cancel',
  '/pay-result',
  '/signup',
  '/users/kakaologin',
];

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const isHeaderVisible = !HEADER_EXCEPTIONAL_PATHS.some(
    path => path === pathname.toLowerCase(),
  );

  return (
    <div className="layout">
      {isHeaderVisible && <Header />}
      <section className="container">{children}</section>
    </div>
  );
};

export default Layout;
