import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Admin from './pages/Admin/Admin';
import Category from './pages/Category/Category';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import Signup from './pages/Signup/Signup';
import KaKaoLogin from './pages/kakao/KaKaoLogin';
import PayResult from './pages/Payment/PayResult';
import Payment from './pages/Payment/Payment';
import PayCancel from './pages/Payment/PayCancel';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/category" element={<Category />} />
          <Route path="/detail/:detailId" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/pay-cancel" element={<PayCancel />} />
          <Route path="/pay-result" element={<PayResult />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users/kakaologin" element={<KaKaoLogin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
