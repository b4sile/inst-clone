import { CommentInterface } from './../redux/slices/timelineSlice';
import { firebase, FieldValue, storageRef } from '../context/firebase';
import { UserDataInterface } from '../redux/slices/userSlice';
import { PhotoInterface, PostInterface } from '../redux/slices/timelineSlice';
import { parseAvatarUrl } from '../helpers/parseAvatarUrl';

export const doesUsernameExist = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.find((user) => user.exists) ? true : false;
};

export const searchUsers = async (value: string) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .orderBy('username')
    .startAt(value)
    .endAt(`${value}\uf8ff`)
    .get();
  return result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  })) as UserDataInterface[];
};

export const updateUserAvatar = async (docId: string, avatarUrl: string) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({ avatarUrl });
};

export const uploadPhoto = async (file: File, username: string) => {
  const snapshot = await storageRef
    .child(`${username}/${Date.now()}.${file.name.split('.').pop()}`)
    .put(file);
  const url = await storageRef
    .child(`${snapshot.metadata.fullPath}`)
    .getDownloadURL();
  return url as string;
};

export const uploadPost = async (
  postData: Omit<PhotoInterface, 'isLiked' | 'docId'>
) => {
  const newPost = await firebase.firestore().collection('photos').add(postData);
  return newPost.id;
};

export const deletePost = async (docId: string) => {
  return firebase.firestore().collection('photos').doc(docId).delete();
};

export const deletePhoto = async (prevUrl: string | null, username: string) => {
  if (!prevUrl) return;
  const url = parseAvatarUrl(prevUrl);
  if (url) await storageRef.child(`${username}/${url}`).delete();
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

export const getUserByUsername = async (
  username: string
): Promise<UserDataInterface | null> => {
  const user = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return user.docs.length > 0
    ? (user.docs.reduce(
        (obj, doc) => (obj = { ...doc.data(), docId: doc.id }),
        {}
      ) as UserDataInterface)
    : null;
};

export const getPostById = async (
  docId: string
): Promise<PhotoInterface | null> => {
  const post = await firebase.firestore().collection('photos').doc(docId).get();
  if (post.exists) return { ...post.data(), docId: post.id } as PhotoInterface;
  return null;
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
  comments: CommentInterface[]
) => {
  return firebase.firestore().collection('photos').doc(docId).update({
    comments,
  });
};

export const getProfilePosts = async (
  profileUserId: string,
  userId: string | null
): Promise<PhotoInterface[]> => {
  const posts = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', profileUserId)
    .orderBy('dateCreated', 'desc')
    .get();

  return posts.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
    isLiked: userId ? doc.data().likes.includes(userId) : false,
  })) as PhotoInterface[];
};
