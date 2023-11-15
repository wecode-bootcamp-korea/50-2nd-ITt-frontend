import React, { useState } from 'react';
import axios from 'axios';
import ProfileImage from '../ProfileImage/ProfileImage';
import Button from '../../../../components/Button/Button';
import './ProfileEdit.scss';

const ProfileEdit = ({ userName, profileImage }) => {
  const [user, setUserName] = useState('');
  const [images, setImages] = useState('');

  const setPreview = e => {
    const reader = new FileReader();

    reader.onload = e => {
      setImages(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUserEdit = () => {
    axios
      .put(
        'http://13.209.21.84:8000/users/mypage/update',
        { profileImages: images },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // token : 'token'
          },
        },
      )
      .then(res => {
        if (res.data.message === 'update_success') {
          alert('변경 성공');
        } else {
          alert('변경 실패');
        }
      });
  };

  return (
    <div className="profileEdit">
      <div className="profileEditArea">
        <div className="nameArea">
          <label htmlFor="nameInput">이름</label>
          <input
            type="text"
            className="nameInput"
            value={user}
            onChange={e => setUserName(e.target.value)}
            placeholder={userName}
          />
        </div>

        <div className="profileArea">
          <label htmlFor="profile">프로필</label>
          <ProfileImage
            src={images ? images : profileImage}
            alt="profileImage"
          />

          <input
            type="file"
            accept="image/*"
            className="imageUpload"
            onChange={setPreview}
          />
        </div>
      </div>
      <div className="editBtn">
        <Button width="200px" onClick={handleUserEdit}>
          변경하기
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
