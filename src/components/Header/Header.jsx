import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const handleLogout = () => {
    const isLogoutConfirmed = window.confirm('로그아웃 하시겠습니까?');

    if (isLogoutConfirmed) {
      localStorage.removeItem('token');
      navigate('/main');
    }
  };

  return (
    <div className="nav">
      <div className="wrapper">
        <div>
          <img
            className="logo"
            alt="logoimg"
            src="/images/gitcat.png"
            onClick={() => navigate('/')}
          />
        </div>

        <ul className="header_links">
          {isLoggedIn ? (
            <>
              <li>
                <p>한적한 하루의 고양이 님</p>
              </li>
              <li>
                <p></p>
              </li>
              <li>
                <p onClick={handleLogout}>로그아웃</p>
              </li>
              <li>
                <p onClick={() => navigate('/mypage')}>마이페이지</p>
              </li>
            </>
          ) : (
            <>
              <li></li>

              <li>
                <Link to="/login">로그인</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
