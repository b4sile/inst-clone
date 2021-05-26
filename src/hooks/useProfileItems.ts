import { selectProfilePosts } from './../redux/slices/profileSlice';
import { useAppSelector } from '.';

export const useProfileItems = (username: string) => {
  const posts = useAppSelector(selectProfilePosts(username));

  return { posts };
};
