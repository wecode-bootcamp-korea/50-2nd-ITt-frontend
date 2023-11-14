import React, { useState, useEffect } from 'react';
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

  function UserNameDisplay() {
    // 사용자 이름을 저장할 상태 변수
    const [userName, setuserName] = useState('');

    useEffect(() => {
      // localStorage에서 사용자 이름 가져오기
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        setuserName(storedUserName);
      }
    }, []); // 빈 배열을 넣어 컴포넌트가 처음 마운트될 때만 실행되도록 함
  }
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
                <p>{userName} 님</p>
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
