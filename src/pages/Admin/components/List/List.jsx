import React from 'react';
import Button from '../../../../components/Button/Button';
import './List.scss';

const List = ({ onAddButtonClick }) => {
  return (
    <div className="list">
      <h3 className="listTitle">이벤트 리스트</h3>
      <div className="listArea">
        <div className="listAdd">
          <Button width="100px" onClick={onAddButtonClick}>
            추가
          </Button>
        </div>
        <ul className="listGroup">
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
          <li className="listInfo">
            <span className="infoTitle">상품 내역</span>
            <div className="btnArea">
              <Button width="70px" height="40px">
                수정
              </Button>
              <Button outline width="70px" height="40px">
                삭제
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default List;
