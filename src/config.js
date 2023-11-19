// src/config.js
const BASE_URL = 'http://10.58.52.121:8000';
const BASE_URL_ADMIN = 'http://10.58.52.115:8000';
const BASE_URL_DETAIL = 'http://10.58.52.168:8000';
const BASE_URL_ORDER = 'http://10.58.52.206:8000';

export const GET_MOCK_API = `${BASE_URL}/MOCK`;
export const GET_DETAIL_API = `${BASE_URL_DETAIL}/detail`;
export const GET_SEAT_API = `${BASE_URL_DETAIL}/detail`;
export const GET_ORDER_API = `${BASE_URL_ORDER}/order`;
export const GET_ADMIN_SELECTLIST_API = `${BASE_URL_ADMIN}/admin/selectList`;
export const GET_ADMIN_INSERTITENLIST_API = `${BASE_URL_ADMIN}/admin/insertItemList`;
export const GET_ADMIN_SELECTITEMLIST_API = `${BASE_URL_ADMIN}/admin/selectItemList`;
export const GET_ADMIN_UPDATITEMLIST_API = `${BASE_URL_ADMIN}/admin/
updateItemList`;
export const GET_ADMIN_DELECTITEMLIST_API = `${BASE_URL_ADMIN}/admin/deleteItemList`;
export const GET_ADMIN_SELECTORDERLIST_API = `${BASE_URL_ADMIN}/admin/selectOrderList`;
export const GET_ADMIN_DELETEORDERLIST_API = `${BASE_URL_ADMIN}/admin/deleteOrderList`;
