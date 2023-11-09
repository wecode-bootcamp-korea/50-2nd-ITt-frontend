import React from 'react';
import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <section className="container">{children}</section>
    </div>
  );
};

export default Layout;
