import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Paper } from '../paper';
import { UserSkeleton } from '../userSkeleton';

export const PostSkeleton = () => {
  return (
    <Paper>
      <div style={{ padding: '16px' }}>
        <UserSkeleton />
      </div>
      <Skeleton style={{ width: '100%', height: '600px' }} />
    </Paper>
  );
};
