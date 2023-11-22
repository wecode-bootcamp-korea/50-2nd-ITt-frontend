// src/config.js

import axios from 'axios';

const BASE_URL = 'http://10.58.52.201:8000';
const loginToken = localStorage.getItem('token');

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.common.Authorization = loginToken;
axios.defaults.timeout = 2500;

//로그인
export const GET_LOGIN_API = `${BASE_URL}/users/adminlogin`;
export const GET_KAKAO_LOGIN_API = `${BASE_URL}/users/kakaologin`;

//관리자
export const GET_ADMIN_SELECTLIST_API = `${BASE_URL}/admin/selectList`;
export const GET_ADMIN_INSERTITENLIST_API = `${BASE_URL}/admin/insertItemList`;
export const GET_ADMIN_SELECTITEMLIST_API = `${BASE_URL}/admin/selectItemList`;
export const GET_ADMIN_UPDATITEMLIST_API = `${BASE_URL}/admin/
updateItemList`;
export const GET_ADMIN_DELECTITEMLIST_API = `${BASE_URL}/admin/deleteItemList`;
export const GET_ADMIN_SELECTORDERLIST_API = `${BASE_URL}/admin/selectOrderList`;
export const GET_ADMIN_DELETEORDERLIST_API = `${BASE_URL}/admin/deleteOrderList`;
export const GET_ADMIN_SELECTCATEGORYLIST_API = `${BASE_URL}/admin/selectCategoryList`;

//상세페이지
export const GET_DETAIL_API = `${BASE_URL}/detail`;
export const GET_SEAT_API = `${BASE_URL}/detail`;
export const GET_ADVANCE_API = `${BASE_URL}/order`;

//결제페이지 유저정보
export const GET_ORDER_API = `${BASE_URL}/order`;
export const GET_ITEM_API = `${BASE_URL}/itemList`;
// 결제페이지 결제 요청
export const PUT_PAYMENT_API = `${BASE_URL}/order/pointDeduction`;

//마이페이지 프로필 업로드
export const PUT_PROFILE_API = `${BASE_URL}/users/mypage/update`;
//마이페이지 결제취소
export const POST_CANCEL_API = `${BASE_URL}/users/mypage/cancel`;
//마이페이지 유저정보
export const GET_USER_API = `${BASE_URL}/users/mypage`;
//마이페이지 유저 결제내역 정보
export const GET_USER_ORDER_API = `${BASE_URL}/order`;
