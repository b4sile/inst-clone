import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useMediaQuery } from 'react-responsive';
import { Paper } from '../paper';
import { UserSkeleton } from '../userSkeleton';

type PostSkeletonProps = { isFullPost?: boolean };

export const PostSkeleton = ({ isFullPost }: PostSkeletonProps) => {
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: isFullPost && !isSmallScreen ? 'row' : 'column',
        marginTop: '40px',
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
