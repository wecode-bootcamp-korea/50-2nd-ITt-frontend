import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import axios from 'axios';
import {
  GET_ADMIN_SELECTLIST_API,
  GET_ADMIN_SELECTITEMLIST_API,
  GET_ADMIN_DELECTITEMLIST_API,
} from '../../../../config';
import './List.scss';

const List = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(GET_ADMIN_SELECTLIST_API, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
        },
      })
      .then(res => {
        setList(res.data.data);
      });
  }, []);

  const setPostClicked = () => {
    navigate('/admin/post');
  };

  const setIsPostClicked = itemId => {
    axios
      .get(`${GET_ADMIN_SELECTITEMLIST_API}/${itemId}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
        },
      })
      .then(() => {
        navigate(`/admin/post/${itemId}`);
      });
  };

  const setIsDelectClicked = itemId => {
    axios
      .delete(`${GET_ADMIN_DELECTITEMLIST_API}/${itemId}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
        },
      })
      .then(() => {
        console.log('aa');
      });
  };

  return (
    <div className="list">
      <h3 className="listTitle">이벤트 리스트</h3>
      <div className="listArea">
        <div className="listAdd">
          <Button width="100px" onClick={setPostClicked}>
            추가
          </Button>
        </div>
        <ul className="listGroup">
          {list.map(list => {
            const { itemId, title } = list;
            return (
              <li className="listInfo" key={itemId}>
                <span className="infoTitle">{title}</span>
                <div className="btnArea">
                  <Button
                    width="70px"
                    height="40px"
                    onClick={() => setIsPostClicked(itemId)}
                  >
                    수정
                  </Button>
                  <Button
                    outline
                    width="70px"
                    height="40px"
                    onClick={() => setIsDelectClicked(itemId)}
                  >
                    삭제
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
