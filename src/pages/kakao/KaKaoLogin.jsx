import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KaKaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const AUTHORIZE_CODE = location.search.split('=')[1];

  console.log('Authorization Code:', AUTHORIZE_CODE);

  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=6730fb02d3d267812582c9fc98fa7898&redirect_uri=http://localhost:8000/kakaologin&code=${AUTHORIZE_CODE}`,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.access_token) {
          postKakaoToken(data.access_token);
          localStorage.setItem('token', data.access_token);
        } else {
          // navigate('/');
        }
      });
  };

  const postKakaoToken = token => {
    axios
      .post(
        'http://10.58.52.212:8000/users/kakaologin',
        {},
        {
          headers: {
            authorization: token,
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
  }, [location.search]);

  return <div>로딩중...</div>;
}
