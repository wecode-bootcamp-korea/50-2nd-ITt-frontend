import React, { useState } from 'react';
import axios from 'axios';
import { PUT_PROFILE_API } from '../../../../config';
import ProfileImage from '../ProfileImage/ProfileImage';
import Button from '../../../../components/Button/Button';
import './ProfileEdit.scss';

const ProfileEdit = ({ name, profileImage }) => {
  const [user, setUserName] = useState('');
  const [files, setFiles] = useState({});
  const [imageUrl, setImageUrl] = useState(profileImage);

  const handleFileUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = data => {
      setImageUrl(data.target.result);
      setFiles(file);
    };
  };

  const handleSubmit = async e => {
    const formData = new FormData();
    formData.append('file', files);

    await axios
      .post(PUT_PROFILE_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
          <ProfileImage src={imageUrl} alt="profileImage" />
          <form className="profileForm" enctype="multipart/form-data">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="imageUpload"
              onChange={handleFileUpload}
            />
          </form>
        </div>
      </div>
      <div className="editBtn">
        <Button width="200px" onClick={handleSubmit}>
          변경하기
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
