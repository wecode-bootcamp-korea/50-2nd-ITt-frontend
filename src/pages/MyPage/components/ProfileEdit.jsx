import React, { useState } from 'react';
import ProfileImage from './ProfileImage';
import Button from '../../../components/Button/Button';
import './ProfileEdit.scss';

const ProfileEdit = ({ name, src, alt }) => {
  const [userName, setUserName] = useState(name);

  return (
    <div className="profileEdit">
      <div className="profileEditArea">
        <div className="nameArea">
          <label htmlFor="nameInput">이름</label>
          <input
            type="text"
            className="nameInput"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>

        <div className="profileArea">
          <label htmlFor="profile">프로필</label>
          <ProfileImage src={src} alt={alt} />
          <input type="file" accept="image/*" className="imageUpload" />
        </div>
      </div>
      <div className="editBtn">
        <Button width="200px">변경하기</Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
