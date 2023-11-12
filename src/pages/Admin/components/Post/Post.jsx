import React from 'react';
import Button from '../../../../components/Button/Button';
import './Post.scss';

const Post = () => {
  return (
    <div className="post">
      <h3 className="postTitle">이벤트 등록</h3>
      <div className="postArea">
        <form className="formArea">
          <div className="formInput">
            <label htmlFor="formTitle" className="formLabel">
              공연제목
            </label>
            <input type="text" id="formTitle" className="formControl" />
          </div>
          <div className="formInput">
            <label htmlFor="formContent" className="formLabel">
              세부내용
            </label>
            <textarea id="formContent" className="formControl textarea" />
          </div>
          <div className="formInput">
            <label htmlFor="formPrice" className="formLabel">
              가격
            </label>
            <input type="text" id="formPrice" className="formControl" />
          </div>
          <div className="formInput">
            <label htmlFor="formAge" className="formLabel">
              등급
            </label>
            <input type="text" id="formAge" className="formControl" />
          </div>
          <div className="formInput">
            <label htmlFor="formTime" className="formLabel">
              관람시간
            </label>
            <input type="text" id="formTime" className="formControl" />
          </div>
          <div className="formInput">
            <label htmlFor="formActor" className="formLabel">
              출연진
            </label>
            <input type="text" id="formActor" className="formControl" />
          </div>
          <div className="formInput">
            <label htmlFor="formDate" className="formLabel">
              공연시간 안내
            </label>
            <input type="text" id="formDate" className="formControl" />
          </div>
          <div className="formInput">
            <label htmlFor="formImg" className="formLabel">
              이미지 업로드
            </label>
            <input type="file" id="formImg" className="formControl" />
          </div>
        </form>
        <div className="btnArea">
          <Button width="100px">확인</Button>
          <Button outline width="100px">
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
