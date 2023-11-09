import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Login.scss';

const Login = () => {
  const [userID, setUserID] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="login">
      <div className="top">
        <div className="topback">
          <Link to="/main">
            <img alt="backimg" className="backimg" src="/images/backimg.png" />
            뒤로가기
          </Link>
        </div>

        <span className="toptext"> 로그인 </span>

        <div className="topadmin" onClick={() => setIsClicked(true)}>
          관리자 계정
        </div>
      </div>
      <div>
        <div className="main">
          <img alt="logoimg" className="logo" src="/images/gitcat.png" />
          <div className="maincont">"페이지 간단 소개 글"</div>
          <img alt="social" className="maincont" src="/images/social.png" />
          <div className="social"></div>
        </div>

        <div className={`loginArea${isClicked ? ' visible' : ''}`}>
          <input
            className="inputWrap"
            onChange={event => setUserID(event.target.value)}
            type="text"
            placeholder="아이디:"
          />

          <input
            className="inputWrap"
            onChange={event => setUserPassword(event.target.value)}
            type="password"
            placeholder="비밀번호:"
          />

          <Button width="500px">로그인</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
