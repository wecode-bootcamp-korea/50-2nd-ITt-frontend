import React, { useState } from 'react';
import axios from 'axios';
import { PUT_PROFILE_API } from '../../../../config';
import ProfileImage from '../ProfileImage/ProfileImage';
import Button from '../../../../components/Button/Button';
import './ProfileEdit.scss';

const ProfileEdit = ({ name, profileImage, getUserData, userData }) => {
  const [files, setFiles] = useState({});
  const [imageUrl, setImageUrl] = useState(profileImage);

  // 프로필 파일 첨부 버튼 클릭 함수
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

  // 프로필 파일 변경 함수
  const handleSubmit = async e => {
    try {
      if (!files) {
        alert('파일을 선택해주세요');
        return;
      }

      const formData = new FormData();
      formData.append('profileImage', files);
      const response = await axios.post(PUT_PROFILE_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { data } = response;

      if (data.message === 'update_success') {
        setImageUrl(data.data.profileImage);
        getUserData();
        localStorage.setItem('profile_image', data.data.profileImage);
      } else {
        console.error('upload error!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profileEdit">
      <div className="profileEditArea">
        <div className="nameArea">
          <p className="label">이름</p>
          <p className="nameValue">{name}</p>
        </div>

        <div className="profileArea">
          <label htmlFor="profile" className="label">
            프로필
          </label>
          <ProfileImage src={imageUrl} alt="profileImage" />
          <form className="profileForm" encType="multipart/form-data">
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
