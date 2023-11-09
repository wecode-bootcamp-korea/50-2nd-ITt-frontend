import React from 'react';
import Datepicker from './components/Datepicker/Datepicker';
import './Detail.scss';

const Detail = () => {
  return (
    <div className="detail">
      <div className="detailArea">
        <div className="titleArea">
          <h2 className="title">뮤지컬</h2>
          <div className="titleInfo">
            <span className="date">2023.11.08 ~ 2023.12.25</span>
            <button type="button" className="location">
              선릉위워크
            </button>
          </div>
        </div>
        <div className="infoArea">
          <div className="infoImg">
            <img src="/images/visual_01.png" alt="삼총사" />
          </div>
          <div className="infoGroup">
            <dl className="infoList">
              <dt>등급</dt>
              <dd>만 7세 이상</dd>
            </dl>
            <dl className="infoList">
              <dt>관람시간</dt>
              <dd>150분</dd>
            </dl>
            <dl className="infoList">
              <dt>출연</dt>
              <dd>-</dd>
            </dl>
            <dl className="infoList">
              <dt>가격</dt>
              <dd>
                <div className="infoPrice">
                  <dl className="priceList">
                    <dt>VIP석</dt>
                    <dd>
                      <span>150,000</span>원
                    </dd>
                  </dl>
                  <dl className="priceList">
                    <dt>R석</dt>
                    <dd>
                      <span>130,000</span>원
                    </dd>
                  </dl>
                  <dl className="priceList">
                    <dt>S석</dt>
                    <dd>
                      <span>100,000</span>원
                    </dd>
                  </dl>
                  <dl className="priceList">
                    <dt>A석</dt>
                    <dd>
                      <span>80,000</span>원
                    </dd>
                  </dl>
                </div>
              </dd>
            </dl>
            <dl className="infoList block">
              <dt>공연시간 안내</dt>
              <dd>
                평일 오후 7시 30분 / 주말 및 공휴일 오후 2시, 6시 30분 <br />
                (월요일 공연 없음, 9월 29일 공연없음)
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="reserveArea">
        <Datepicker />
      </div>
    </div>
  );
};

export default Detail;
