import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const ProfileSkeleton = () => {
  return (
    <div style={{ padding: '30px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />{' '}
        <div
          style={{
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Skeleton style={{ marginBottom: '5px' }} height={15} width={100} />
          <Skeleton height={12} width={55} />
        </div>
      </div>
      <div
        style={{
          paddingTop: '50px',
        }}
      >
        <Skeleton style={{ width: '100%', height: '600px' }} />
      </div>
    </div>
  );
};
