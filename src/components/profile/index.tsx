import React from 'react';
import { useProfile } from '../../hooks/userProfile';
import s from './style.module.scss';
import cn from 'classnames';
import { Avatar, Button } from '..';
import { ProfileItems } from '../profileItems';
import { ProfileSkeleton } from '../profileSkeleton.tsx';

type ProfileProps = { className?: string };

export const Profile = ({ className }: ProfileProps) => {
  const {
    profileUser,
    isLoading,
    userId,
    isUserFollowing,
    countProfilePosts,
    handleFollowUser,
    onChangeAvatar,
  } = useProfile();

  if (isLoading && !profileUser) return <ProfileSkeleton />;
  if (!profileUser) return <h2>This user doesn't exist.</h2>;

  const {
    username,
    fullName,
    following,
    followers,
    userId: profileUserId,
    docId: profileDocId,
    avatarUrl,
  } = profileUser;

  const isOurAccount = profileUserId === userId;
  const isSignIn = Boolean(userId);
  const isFollowed =
    !isOurAccount && isSignIn && userId && followers.includes(userId);

  return (
    <div className={cn(s.container, className)}>
      <section className={s.top}>
        <div className={s.left}>
          <label className={s.avatar__label}>
            <Avatar url={avatarUrl} size={150} />
            {isOurAccount && (
              <input
                className={s.avatar__input}
                type="file"
                onChange={onChangeAvatar}
              />
            )}
          </label>
        </div>
        <div className={s.right}>
          <div className={s.right__top}>
            <h1>{username}</h1>
            {!isSignIn ? (
              ''
            ) : isOurAccount ? (
              <Button color="secondary">Edit Profile</Button>
            ) : (
              <Button
                onClick={() =>
                  handleFollowUser(
                    profileDocId,
                    profileUserId,
                    isFollowed ? 'remove' : 'add'
                  )
                }
                variant="contained"
                color={isFollowed ? 'secondary' : 'primary'}
                isLoading={isUserFollowing}
                disabled={isUserFollowing}
              >
                {isFollowed ? 'UnFollow' : 'Follow'}
              </Button>
            )}
          </div>
          <ul className={s.list}>
            <li>
              <span>{countProfilePosts} </span>posts
            </li>
            <li>
              <span>{followers.length} </span>followers
            </li>
            <li>
              <span>{following.length} </span>following
            </li>
          </ul>
          <p>{fullName}</p>
        </div>
      </section>
      <section>
        <ProfileItems username={username} />
      </section>
    </div>
  );
};
