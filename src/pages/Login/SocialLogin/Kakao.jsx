// import React, { useEffect } from 'react';

// const KakaoLogin = () => {
//   useEffect(() => {
//     // 카카오 sdk 스크립트 로드 및 초기화
//     window.Kakao.init('YOUR_JAVASCRIPT_KEY'); // 자바스크립트 키로 초기화
//   }, []);

//   const handleLogin = () => {
//     // 카카오 로그인 창을 호출
//     window.Kakao.Auth.login({
//       success: function (authObj) {
//         // 로그인 성공 시 토큰이 담긴 authObj를 받음
//         console.log(authObj);

//         // 사용자 정보 가져오기
//         window.Kakao.API.request({
//           url: '/v2/user/me',
//           success: res => {
//             const kakao_account = res.kakao_account;
//             console.log(kakao_account);
//           },
//           fail: error => {
//             console.log(error);
//           },
//         });
//       },
//       fail: function (err) {
//         console.error(err);
//       },
//     });
//   };

//   return (
//     <button onClick={handleLogin}>카카오로 로그인하기</button>
//   );
// };

// export default KakaoLogin;
