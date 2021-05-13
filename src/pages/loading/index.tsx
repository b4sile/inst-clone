import { AiOutlineInstagram } from 'react-icons/ai';
import React from 'react';

export const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AiOutlineInstagram style={{ width: '40px', height: '40px' }} />
    </div>
  );
};
