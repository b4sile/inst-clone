import Firebase from 'firebase/app';

export const getUserFromLocalStorage = (): Firebase.User | null => {
  console.log('get');
  const user = localStorage.getItem('authUser');
  if (!user) return null;
  return JSON.parse(user);
};
