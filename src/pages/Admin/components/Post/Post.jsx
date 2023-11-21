import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const Post = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const { itemId } = useParams();
  const [update, setUpdate] = useState({});
  const [updateData, setUpdateData] = useState({
    title: '',
    image: '',
    runningTime: Number,
    viewerAge: '',
    price: Number,
    itemNotice: '',
    categoryName: '',
    locationName: '',
    actorName: '',
  });
  const [category, setCategory] = useState([]);
  const [actor, setActor] = useState([]);
  const [date, setDate] = useState([{}]);

  useEffect(() => {
    if (itemId) {
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
          setCategory(res.data.data.categoryInfo);
          setActor(res.data.data.actorInfo);
          setDate(res.data.data.itemOption);
        });
    }
  }, [itemId]);

  const updateObject = Object.keys(update).length > 0;
  if (updateObject.length) setUpdateData(update.itemInfo[0]);

  const actorAddClick = () => {
    const updatedActorList = [...actor, { actorName: updateData.actorName }];
    setActor(updatedActorList);
    setUpdateData({ ...updateData, actorName: '' });
  };

  const handlePostClick = () => {
    if (itemId) {
      axios
        .put(
          `${GET_ADMIN_UPDATITEMLIST_API}`,
          {
            itemId: itemId,
            title: updateData.title,
            image: updateData.image,
            runningTime: updateData.runningTime,
            viewerAge: updateData.viewerAge,
            price: updateData.price,
            itemNotice: updateData.itemNotice,
            categoryName: updateData.categoryName,
            locationName: updateData.locationName,
            actorName: actor.map(a => a.actorName),
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
          console.log('aa');
        });
    } else {
      axios
        .post(
          `${GET_ADMIN_INSERTITENLIST_API}`,
          {
            title: updateData.title,
            image: updateData.image,
            runningTime: updateData.runningTime,
            viewerAge: updateData.viewerAge,
            price: updateData.price,
            itemNotice: updateData.itemNotice,
            categoryName: updateData.categoryName,
            locationName: updateData.locationName,
            actorName: actor.map(a => a.actorName),
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
    }
  };

  const onClose = () => {
    navigate(`/admin`);
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
              value={updateData.title}
              onChange={event =>
                setUpdateData({ ...updateData, title: event.target.value })
              }
            />
          </div>
          <div className="formInput">
            <label htmlFor="formImg" className="formLabel">
              이미지 업로드
            </label>
            <input type="file" id="formImg" className="formControl img" />
            <img src={updateData.image} alt={updateData.title} />
          </div>
          <div className="formInput">
            <label htmlFor="formTime" className="formLabel">
              상영시간
            </label>
            <input
              type="text"
              id="formTime"
              className="formControl"
              value={updateData.runningTime}
              onChange={event =>
                setUpdateData({
                  ...updateData,
                  runningTime: event.target.value,
                })
              }
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
              value={updateData.viewerAge}
              onChange={event =>
                setUpdateData({ ...updateData, viewerAge: event.target.value })
              }
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
              value={updateData.price}
              onChange={event =>
                setUpdateData({ ...updateData, price: event.target.value })
              }
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
              value={updateData.itemNotice}
              onChange={event =>
                setUpdateData({ ...updateData, itemNotice: event.target.value })
              }
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
              value={updateData.categoryName}
              onChange={event =>
                setUpdateData({
                  ...updateData,
                  categoryName: event.target.value,
                })
              }
            >
              {category.map(category => (
                <option key={category.categoryId}>
                  {category.categoryName}
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
              value={updateData.locationName}
              onChange={event =>
                setUpdateData({
                  ...updateData,
                  locationName: event.target.value,
                })
              }
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
              value={updateData.actorName}
              onChange={event =>
                setUpdateData({
                  ...updateData,
                  actorName: event.target.value,
                })
              }
            />
            <Button onClick={actorAddClick}>추가</Button>
            {actor.map((actor, index) => (
              <span key={index}>{actor.actorName}</span>
            ))}
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
