import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import SocialLogin from '../../components/Auth/SocialLogin';
import './Login.scss';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const validUserEmail = 'admin@admin.com';
  const validUserPassword = 'admin12345';

  const handleLogin = () => {
    if (userEmail === validUserEmail && userPassword === validUserPassword) {
      navigate('/admin');
    } else {
      alert('잘못된 이메일 또는 비밀번호입니다.');
      setUserEmail('');
      setUserPassword('');
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="topBack">
          <Link to="/main">
            <img alt="backimg" className="backImg" src="/images/backimg.png" />
            뒤로가기
          </Link>
        </div>

        <span className="topText"> 로그인 </span>

        <div className="topAdmin" onClick={() => setIsClicked(true)}>
          관리자 계정
        </div>
      </div>
      <div>
        <div className="main">
          <img alt="logoimg" className="logo" src="/images/gitcat.png" />
          <div className="maincont">"환영합니다!"</div>

          <div>
            <SocialLogin />
          </div>
        </div>

        <div className={`loginArea${isClicked ? ' visible' : ''}`}>
          <input
            className="inputWrap"
            value={userEmail}
            onChange={event => setUserEmail(event.target.value)}
            type="text"
            placeholder="이메일:"
          />

          <input
            className="inputWrap"
            value={userPassword}
            onChange={event => setUserPassword(event.target.value)}
            type="password"
            placeholder="비밀번호:"
          />

          <Button className="adminLogin" onClick={handleLogin}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
