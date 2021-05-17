import { firebase, FieldValue } from '../context/firebase';
import { UserDataInterface } from '../redux/slices/userSlice';

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
): Promise<UserDataInterface | null> => {
  const user = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  return user.docs.length > 0
    ? (user.docs.reduce(
        (obj, doc) => (obj = { ...doc.data(), docId: doc.id }),
        {}
      ) as UserDataInterface)
    : null;
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
