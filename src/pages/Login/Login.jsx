import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { useState } from 'react';
import '../../components/Button/Button.scss';
import '../../styles/variable.scss';

const Login = () => {
  const [userID, saveUserID] = useState('');
  const [userPassword, saveUserPassword] = useState('');
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const goToMain = () => {
    navigate('/main');
  };
  // const goSignup = () => {
  //   navigate('/Signup');
  // };

  // const isInputValid = userEmail.includes('@') && userPassword.length >= 5;

  // const doFetch1 = () => {
  //   fetch('http://10.58.52.202:8000/users/signin', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify({
  //       email: userEmail,
  //       password: userPassword,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.message === 'LOGIN_SUCCESS') {
  //         localStorage.setItem('token', data.token);
  //         navigate('/threadPost');
  //       } else if (data.message === 'EMAIL_NOT_FOUND') {
  //         alert('가입되지 않은 이메일 입니다.');
  //         navigate('/');
  //       } else if (data.message === 'WRONG_PASSWORD') {
  //         alert('비밀번호가 틀렸습니다.');
  //         navigate('/');
  //       }
  //     });
  // };
  return (
    <>
      <div className="top">
        <button className="topback" onClick={goToMain}>
          &#60; 뒤로가기
        </button>

        <span className="toptext"> 로그인 </span>

        <button className="topadmin" onClick={() => setIsClicked(true)}>
          관리자 계정
        </button>
      </div>
      <div>
        <div className="main">
          <img id="logo" src="/images/gitcat.png" />
          <div className="maincont">"페이지 간단 소개 글"</div>
          <img className="maincont" src="/images/social.png" />
          <div className="social"></div>
        </div>

        <div className={`login${isClicked ? ' visible' : ''}`}>
          <div>
            <input
              className="inputwrap"
              onChange={event => saveUserID(event.target.value)}
              type="ID"
              placeholder="아이디:"
            />
          </div>

          <div>
            <input
              className="inputwrap"
              onChange={event => saveUserPassword(event.target.value)}
              type="password"
              placeholder="비밀번호:"
            />
          </div>

          <button
            className="btn"
            type="button"
            // onClick={doFetch1}
            // className={isInputValid ? 'buttonLogin' : 'buttonLoginDisabled'}
            // disabled={isInputValid ? false : true}
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
