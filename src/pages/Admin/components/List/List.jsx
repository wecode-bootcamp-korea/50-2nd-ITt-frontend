import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import axios from 'axios';
import {
  GET_ADMIN_SELECTLIST_API,
  GET_ADMIN_UPDATELIST_API,
} from '../../../../config';
import './List.scss';

const List = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(GET_ADMIN_SELECTLIST_API, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then(res => {
        setList(res.data.data);
      });
  }, []);

  const setIsPostClicked = id => {
    axios
      .get(`${GET_ADMIN_UPDATELIST_API}/${id}`, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then(() => {
        navigate(`/admin/post/${id}`);
      });
  };

  return (
    <div className="list">
      <h3 className="listTitle">이벤트 리스트</h3>
      <div className="listArea">
        <div className="listAdd">
          <Button width="100px" onClick={setIsPostClicked}>
            추가
          </Button>
        </div>
        <ul className="listGroup">
          {list.map(list => {
            const { id, title } = list;
            return (
              <li className="listInfo" key={id}>
                <span className="infoTitle">{title}</span>
                <div className="btnArea">
                  <Button
                    width="70px"
                    height="40px"
                    onClick={() => setIsPostClicked(id)}
                  >
                    수정
                  </Button>
                  <Button outline width="70px" height="40px">
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
