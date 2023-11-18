import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PUT_PROFILE_API } from '../../../../config';
import ProfileImage from '../ProfileImage/ProfileImage';
import Button from '../../../../components/Button/Button';
import './ProfileEdit.scss';

const ProfileEdit = ({ name, profileImage }) => {
  const [user, setUserName] = useState(name);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    axios
      .post(PUT_PROFILE_API, {
        formData,
      })
      .then(res => {
        if (res.data.data) {
          setImageUrl(res.data.data);
        }
      })
      .catch(error => console.error(error));
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
            placeholder={name}
          />
        </div>

        <div className="profileArea">
          <label htmlFor="profile">프로필</label>
          <ProfileImage src={profileImage} alt="profileImage" />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="imageUpload"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="editBtn">
        <Button width="200px">변경하기</Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
