import React from 'react';

export default function SocialLogin() {
  const kakaoAuthUrl = process.env.REACT_APP_KAKAO_AUTH_URL;
  const handleLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>카카오로 로그인</button>
    </div>
  );
}
