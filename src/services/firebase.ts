import { CommentInterface } from './../redux/slices/timelineSlice';
import { firebase, FieldValue } from '../context/firebase';
import { UserDataInterface } from '../redux/slices/userSlice';
import { PhotoInterface, PostInterface } from '../redux/slices/timelineSlice';

export const doesUsernameExist = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.find((user) => user.exists) ? true : false;
};

export const getUserById = async (
  userId: string
): Promise<UserDataInterface> => {
  const user = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  return user.docs.reduce(
    (obj, doc) => (obj = { ...doc.data(), docId: doc.id }),
    {}
  ) as UserDataInterface;
};

export const getSuggestions = async (
  userId: string,
  count: number,
  following: string[]
): Promise<UserDataInterface[]> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', 'not-in', [...following, userId])
    .limit(count)
    .get();
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as UserDataInterface[];
};

export const updateUserFollowing = async (
  docId: string,
  profileId: string,
  method: 'add' | 'remove'
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      following:
        method === 'add'
          ? FieldValue.arrayUnion(profileId)
          : FieldValue.arrayRemove(profileId),
    });
};

export const updateUserFollowers = async (
  docId: string,
  profileId: string,
  method: 'add' | 'remove'
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      followers:
        method === 'add'
          ? FieldValue.arrayUnion(profileId)
          : FieldValue.arrayRemove(profileId),
    });
};

export const getPhotosForTimeline = async (
  following: string[],
  userId: string
): Promise<PostInterface[]> => {
  const photosResponse = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .orderBy('dateCreated', 'desc')
    .limit(3)
    .get();

  const photos = photosResponse.docs.map(
    (doc) => ({ ...doc.data(), docId: doc.id } as PhotoInterface)
  );

  const users = await Promise.all(
    photos.map((photo) => getUserById(photo.userId))
  );

  return users.map((user, ind) => ({
    user,
    ...photos[ind],
    isLiked: photos[ind].likes.includes(userId),
  }));
};

export const updatePostLikes = async (
  docId: string,
  userId: string,
  method: 'add' | 'remove'
) => {
  return firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      likes:
        method === 'add'
          ? FieldValue.arrayUnion(userId)
          : FieldValue.arrayRemove(userId),
    });
};

export const updatePostComments = async (
  docId: string,
  comment: CommentInterface
) => {
  return firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      comments: FieldValue.arrayUnion(comment),
    });
};
