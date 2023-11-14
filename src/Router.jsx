import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Admin from './pages/Admin/Admin';
import Category from './pages/Category/Category';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Mypage from './pages/Mypage/Mypage';
import Payment from './pages/Payment/Payment';
import Signup from './pages/Signup/Signup';
import KaKaoLogin from './pages/kakao/KaKaoLogin';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/category" element={<Category />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kakaologin" element={<KaKaoLogin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
