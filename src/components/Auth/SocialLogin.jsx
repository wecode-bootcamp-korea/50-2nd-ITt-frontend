import React from 'react';

export default function SocialLogin() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=6730fb02d3d267812582c9fc98fa7898&redirect_uri=http://localhost:3000/users/kakaologin`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="my-8 pb-8 border-b">
      <button className="flex justify-center" onClick={handleLogin}>
        카카오로 로그인
      </button>
    </div>
  );
}
