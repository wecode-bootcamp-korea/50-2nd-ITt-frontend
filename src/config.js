// src/config.js
const BASE_URL = 'http://10.58.52.121:8000';
const BASE_URL_DETAIL = 'http://10.58.52.168:8000';
const BASE_URL_ORDER = 'http://10.58.52.206:8000';
const BASE_URL_ITEM = 'http://10.58.52.162:8000';
import axios from 'axios';

axios.defaults.baseURL = 'http://10.58.52.250:8000';
axios.defaults.headers.common.Authorization = `${process.env.REACT_APP_PAYMENT_TOKEN}`;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.timeout = 2500;

const BASE_URL = 'http://10.58.52.121:8000';
const BASE_URL_DETAIL = 'http://10.58.52.119:8000';
const BASE_URL_ADVANCE = 'http://10.58.52.176:8000';
const BASE_URL_ORDER = 'http://10.58.52.176:8000';
const BASE_URL_MYPAGE = 'http://10.58.52.115:8000';

//상세페이지
export const GET_DETAIL_API = `${BASE_URL_DETAIL}/detail`;
export const GET_SEAT_API = `${BASE_URL_DETAIL}/detail`;
export const GET_ADVANCE_API = `${BASE_URL_ADVANCE}/order`;

//결제페이지 유저정보
export const GET_ORDER_API = `${BASE_URL_ORDER}/order`;
export const GET_ITEM_API = `${BASE_URL_ITEM}/itemList`;
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
