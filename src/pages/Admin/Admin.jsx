import React, { useState } from 'react';
import List from './components/List/List';
import Dashboard from './components/Dashboard/Dashboard';
import './Admin.scss';

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('리스트');

  const ADMIN_MENUS = [
    {
      menu: '리스트',
      component: <List />,
    },
    { menu: '대시보드', component: <Dashboard /> },
  ];

  return (
    <div className="admin">
      <div className="navArea">
        <h2 className="navTitle">관리자페이지</h2>
        <ul className="navList">
          {ADMIN_MENUS.map(({ menu }) => (
            <li key={menu}>
              <button
                type="button"
                onClick={() => setSelectedMenu(menu)}
                className={`navMenu ${selectedMenu === menu ? 'active' : ''}`}
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="adminArea">
        {ADMIN_MENUS.find(({ menu }) => menu === selectedMenu).component}
      </div>
    </div>
  );
};

export default Admin;
