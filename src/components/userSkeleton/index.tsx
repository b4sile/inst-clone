import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const UserSkeleton = () => {
  return (
    <div style={{ display: 'flex', marginTop: '10px' }}>
      <Skeleton width={32} height={32} circle />
      <div
        style={{
          marginLeft: '12px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Skeleton style={{ marginBottom: '5px' }} height={15} width={100} />
        <Skeleton height={12} width={55} />
      </div>
    </div>
  );
};
