import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import {
  GET_ADMIN_SELECTITEMLIST_API,
  GET_ADMIN_INSERTITENLIST_API,
  GET_ADMIN_UPDATITEMLIST_API,
} from '../../../../config';
import 'react-datepicker/dist/react-datepicker.css';
import './Post.scss';

const Post = ({ onClose }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const { itemId } = useParams();
  const [update, setUpdate] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [titleText, setTitleText] = useState('');
  const [actor, setActor] = useState([]);

  useEffect(() => {
    axios
      .get(`${GET_ADMIN_SELECTITEMLIST_API}/${itemId}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
        },
      })
      .then(res => {
        setUpdate(res.data.data);
        setUpdateData(res.data.data.itemInfo[0]);
      });
  }, [itemId]);

  const updateObject = Object.keys(update).length > 0;
  if (updateObject.length) setUpdateData(update.itemInfo[0]);

  const {
    title,
    image,
    runningTime,
    viewerAge,
    price,
    itemNotice,
    categoryName,
    locationName,
  } = updateData;

  const handlePostClick = () => {
    // axios
    //   .put(
    //     `${GET_ADMIN_UPDATITEMLIST_API}`,
    //     {
    //       itemId: itemId,
    //       title: titleText,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json;charset=utf-8',
    //         authorization:
    //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
    //       },
    //     },
    //   )
    //   .then(() => {
    //     console.log('aa');
    //   });
    axios
      .post(
        `${GET_ADMIN_INSERTITENLIST_API}`,
        {
          title: titleText,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
          },
        },
      )
      .then(() => {
        console.log('dd');
      });
  };

  return (
    <div className="post">
      <h3 className="postTitle">이벤트 등록</h3>
      <div className="postArea">
        <form className="formArea">
          <div className="formInput">
            <label htmlFor="formTitle" className="formLabel">
              공연제목
            </label>
            <input
              type="text"
              id="formTitle"
              className="formControl"
              defaultValue={title}
              value={titleText}
              onChange={event => setTitleText(event.target.value)}
            />
          </div>
          <div className="formInput">
            <label htmlFor="formImg" className="formLabel">
              이미지 업로드
            </label>
            <input
              type="file"
              id="formImg"
              className="formControl img"
              defaultValue={image}
            />
            <img src={image} alt={title} />
          </div>
          <div className="formInput">
            <label htmlFor="formTime" className="formLabel">
              상영시간
            </label>
            <input
              type="text"
              id="formTime"
              className="formControl"
              defaultValue={runningTime}
            />
          </div>
          <div className="formInput">
            <label htmlFor="formAge" className="formLabel">
              등급안내
            </label>
            <input
              type="text"
              id="formAge"
              className="formControl"
              defaultValue={viewerAge}
            />
          </div>
          <div className="formInput">
            <label htmlFor="formPrice" className="formLabel">
              가격
            </label>
            <input
              type="text"
              id="formPrice"
              className="formControl"
              value={price}
            />
          </div>
          <div className="formInput">
            <label htmlFor="formDate" className="formLabel">
              공연시간 안내
            </label>
            <input
              type="text"
              id="formDate"
              className="formControl"
              defaultValue={itemNotice}
            />
          </div>
          <div className="formInput">
            <label htmlFor="formSelect" className="formLabel">
              카테고리
            </label>
            <select
              name="category"
              id="formSelect"
              className="formControl"
              value={categoryName}
            >
              {CATEGORY.map(item => (
                <option key={item.id} defaultValue={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>
          <div className="formInput">
            <label htmlFor="formLocation" className="formLabel">
              장소
            </label>
            <input
              type="text"
              id="formLocation"
              className="formControl"
              value={locationName}
            />
          </div>
          <div className="formInput">
            <label htmlFor="formActor" className="formLabel">
              출연진
            </label>
            <input
              type="text"
              id="formActor"
              className="formControl"
              defaultValue={actor}
              value={actor}
              onChange={event => setActor(event.target.value)}
            />
          </div>
        </form>
        <div className="dateArea">
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            dateFormat="yyyy년 MM월 dd일"
            locale={ko}
            inline
            selectsRange
          />
        </div>
        <div className="btnArea">
          <Button width="100px" onClick={() => handlePostClick(itemId)}>
            확인
          </Button>
          <Button outline width="100px" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;

const CATEGORY = [
  { id: 1, category: '뮤지컬' },
  { id: 2, category: '연극' },
  { id: 3, category: '전시' },
  { id: 4, category: '콘서트' },
];
