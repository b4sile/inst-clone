import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Paper } from '../paper';
import { UserSkeleton } from '../userSkeleton';

type PostSkeletonProps = { isFullPost?: boolean };

export const PostSkeleton = ({ isFullPost }: PostSkeletonProps) => {
  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: isFullPost ? 'row' : 'column',
      }}
    >
      <div style={{ padding: '16px' }}>
        <UserSkeleton />
      </div>
      <div
        style={{
          flexBasis: !isFullPost ? '100%' : '66%',
          height: '600px',
          order: isFullPost ? -1 : 1,
        }}
      >
        <Skeleton
          style={{ width: '100%', height: isFullPost ? '600px' : '600px' }}
        />
      </div>
    </Paper>
  );
};
