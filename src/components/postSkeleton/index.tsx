import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useMediaQuery } from 'react-responsive';
import { Paper } from '../paper';
import { UserSkeleton } from '../userSkeleton';

type PostSkeletonProps = { isFullPost?: boolean; isModalPost?: boolean };

export const PostSkeleton = ({
  isFullPost,
  isModalPost,
}: PostSkeletonProps) => {
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: isFullPost && !isSmallScreen ? 'row' : 'column',
        marginTop: !isModalPost ? '40px' : '0px',
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
