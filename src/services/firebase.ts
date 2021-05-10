import { firebase, FieldValue } from '../context/firebase';

export const doesUsernameExist = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.find((user) => user.exists) ? true : false;
};
