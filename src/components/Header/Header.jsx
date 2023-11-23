import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    !!localStorage.getItem('token') || !!localStorage.getItem('adminToken');
  const name = localStorage.getItem('name');
  // const profile_image = localStorage.getItem('profile_image');
  const handleLogout = () => {
    const isLogoutConfirmed = window.confirm('로그아웃 하시겠습니까?');

    if (isLogoutConfirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('id');
      localStorage.removeItem('is_admin');
      localStorage.removeItem('name');
      localStorage.removeItem('userName');
      localStorage.removeItem('profile_image');

      navigate('/');
    }
  };

  return (
    <div className="nav">
      <div className="wrapper">
        <div>
          <img
            className="logo link"
            alt="logoimg"
            src="/images/logo2.png"
            onClick={() => navigate('/')}
          />
        </div>

        <ul className="headerText">
          {isLoggedIn ? (
            <>
              {/* <img className="propic" alt="propic" src={profile_image} /> */}

              <li>
                <p>{name} 님</p>
              </li>
              <li>
                <p className="link" onClick={handleLogout}>
                  로그아웃
                </p>
              </li>
              <li>
                <p
                  className="link"
                  onClick={() => navigate('/mypage?status=complete')}
                >
                  마이페이지
                </p>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">로그인</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
