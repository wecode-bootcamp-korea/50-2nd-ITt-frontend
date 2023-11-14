import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KaKaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const AUTHORIZE_CODE = location.search.split('=')[1];

  console.log('Authorization Code:', AUTHORIZE_CODE);

  const getKakaoToken = () => {
    fetch(`http://10.58.52.212:8000/users/kakaologin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=utf-8',
        code: AUTHORIZE_CODE,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.result.token) {
          // postKakaoToken(data.access_token);
          localStorage.setItem('token', data.result.token);
          localStorage.setItem('userName', data.result.userName);
          navigate('/');
        }
      });
  };

  // const postKakaoToken = token => {
  //   axios
  //     .post(
  //       'http://10.58.52.212:8000/users/kakaologin',
  //       {},
  //       {
  //         headers: {
  //           authorization: token,
  //           'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //         },
  //       },
  //     )
  //     .then(response => {
  //       console.log(response);
  //       localStorage.setItem('token', response.data.accessToken);
  //       navigate('/');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
  }, [location.search]);

  return <div>로딩중...</div>;
}
