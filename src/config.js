import axios from 'axios';

// src/config.js

axios.defaults.baseURL = 'http://10.58.52.250:8000';
axios.defaults.headers.common.Authorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwYzBidW1AZ21haWwuY29tIiwibmFtZSI6Iuq5gOyYgeuylCIsImlhdCI6MTcwMDExNDU4Nn0.GbMPNLlMF27ThioX5DnQUqLMcQNVl58Ux4Ww_IuGmTc';
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJqb21pbnN1Nzc4QG5hdGUuY29tIiwibmFtZSI6IuyhsOuvvOyImCIsImlzX2FkbWluIjowLCJpYXQiOjE3MDAxOTQ0MTF9.XEFtIKSKQH2kqScgntH_krpdCdKZvrUFCj_zlx1eZU8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.timeout = 2500;

const BASE_URL_DETAIL = 'http://10.58.52.250:8000';
const BASE_URL_ORDER = 'http://10.58.52.176:8000';
const BASE_URL_MYPAGE = 'http://10.58.52.115:8000';

//상세페이지
export const GET_DETAIL_API = `${BASE_URL_DETAIL}/detail`;

//결제페이지 유저정보
export const GET_ORDER_API = `${BASE_URL_ORDER}/order`;

// 결제페이지 결제 요청
export const PUT_PAYMENT_API = `${BASE_URL_ORDER}/order/pointDeduction`;

//마이페이지 프로필 업로드
export const PUT_PROFILE_API = `${BASE_URL_MYPAGE}/users/mypage/update`;

//마이페이지 결제취소
export const POST_CANCEL_API = `${BASE_URL_MYPAGE}/users/mypage/cancel`;

//마이페이지 유저정보
export const GET_USER_API = `${BASE_URL_MYPAGE}/users/mypage`;

//마이페이지 유저 결제내역 정보
export const GET_USER_ORDER_API = `${BASE_URL_ORDER}/order`;
