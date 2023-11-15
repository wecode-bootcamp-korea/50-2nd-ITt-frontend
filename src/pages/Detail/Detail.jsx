import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Datepicker from './components/Datepicker/Datepicker';
import Button from '../../components/Button/Button';
import Seat from './components/Seat/Seat';
import { GET_DETAIL_API } from '../../config';
import './Detail.scss';

const Detail = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { detailId } = useParams();
  const [detail, setdetail] = useState({});
  const [price, setPrice] = useState([]);

  useEffect(() => {
    fetch(`${GET_DETAIL_API}/${detailId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        setdetail(data.data.itemInfo[0]);
        setPrice(data.data.itemClassInfo);
      });
  }, [detailId]);

  const { title, image, running_time, viewer_age, actor_name, location_name } =
    detail;

  return (
    <div className="detail">
      <div className="detailArea">
        <div className="titleArea">
          <h2 className="title">{title}</h2>
          <div className="titleInfo">
            <span className="date">2023.11.08 ~ 2023.12.25</span>
            <button type="button" className="location">
              {location_name}
            </button>
          </div>
        </div>
        <div className="infoArea">
          <div className="infoImg">
            <img src={image} alt={title} />
          </div>
          <div className="infoGroup">
            <dl className="infoList">
              <dt>등급</dt>
              <dd>{viewer_age}</dd>
            </dl>
            <dl className="infoList">
              <dt>관람시간</dt>
              <dd>{running_time}분</dd>
            </dl>
            <dl className="infoList">
              <dt>출연</dt>
              <dd>{actor_name}</dd>
            </dl>
            <dl className="infoList">
              <dt>가격</dt>
              <dd>
                <div className="infoPrice">
                  {price.map(index => (
                    <dl className="priceList" key={index}>
                      <dt>{index.name}석</dt>
                      <dd>
                        <span>{index.price}</span>원
                      </dd>
                    </dl>
                  ))}
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
        <div className="dateArea">
          <h3 className="dateTitle">날짜/시간 선택</h3>
          <div className="dateGroup">
            <Datepicker
              startDate={startDate}
              setStartDate={setStartDate}
              minDate="2023-10-01"
              maxDate="2023-11-11"
            />
            <div className="timePicker">
              <span className="timeTitle">시간</span>
              <div className="titleList">
                {TIMEDATA.map(time => (
                  <div className="formInput" key={time.id}>
                    <input
                      type="radio"
                      id={`timePicker${time.id}`}
                      className="formRadio"
                      name="timePicker"
                    />
                    <label
                      htmlFor={`timePicker${time.id}`}
                      className="formLabel"
                    >
                      {time.time}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="btnArea">
          <Button width="230px">예매하기</Button>
        </div>
      </div>
      <div className="seatsArea">
        <Seat />
      </div>
    </div>
  );
};

export default Detail;

export const TIMEDATA = [
  { id: 1, time: '14:00' },
  { id: 2, time: '16:00' },
  { id: 3, time: '18:00' },
  { id: 4, time: '20:00' },
  { id: 5, time: '22:00' },
];
