import React, { useState } from 'react';
import List from './components/List/List';
import Dashboard from './components/Dashboard/Dashboard';
import Post from './components/Post/Post';
import './Admin.scss';

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('list');
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

  const handleMenuClick = menu => {
    setSelectedMenu(menu);
    setIsAddButtonClicked(false);
  };

  const handleAddButtonClick = () => {
    setIsAddButtonClicked(true);
  };

  return (
    <div className="admin">
      <div className="navArea">
        <h2 className="navTitle">관리자페이지</h2>
        <ul className="navList">
          <li>
            <button
              type="button"
              onClick={() => handleMenuClick('list')}
              className={`navMenu ${selectedMenu === 'list' ? 'active' : ''}`}
            >
              리스트
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleMenuClick('dashboard')}
              className={`navMenu ${
                selectedMenu === 'dashboard' ? 'active' : ''
              }`}
            >
              대시보드
            </button>
          </li>
        </ul>
      </div>
      <div className="adminArea">
        {selectedMenu === 'list' && !isAddButtonClicked && (
          <List onAddButtonClick={handleAddButtonClick} />
        )}
        {selectedMenu === 'dashboard' && <Dashboard />}
        {isAddButtonClicked && <Post />}
      </div>
    </div>
  );
};

export default Admin;
