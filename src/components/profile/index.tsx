import React from 'react';
import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div>
      <div>Profile: {username}</div>
    </div>
  );
};
