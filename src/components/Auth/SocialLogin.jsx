import React from 'react';
import './SocialLogin.scss';

export default function SocialLogin() {
  const kakaoAuthUrl = process.env.REACT_APP_KAKAO_AUTH_URL;
  const handleLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div>
      <img
        className="socialImg"
        alt="social"
        src="/images/kakao_login_large_wide.png"
        onClick={handleLogin}
      />
    </div>
  );
}
