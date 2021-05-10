import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, InputText } from '../../components';
import { ROUTES } from '../../constants/routes';
import { FirebaseContext } from '../../context/firebase';
import { doesUsernameExist } from '../../services/firebase';
import s from './style.module.scss';

const SignUp = () => {
  const history = useHistory();
  const { firebase } = React.useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const isInvalid =
    password === '' ||
    emailAddress === '' ||
    fullName === '' ||
    username === '';

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInvalid) return;
    try {
      const userNameExists = await doesUsernameExist(username);
      if (userNameExists) {
        throw Error('Username is already taken');
      }
      const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);
      await newUser.user?.updateProfile({ displayName: username });
      await firebase.firestore().collection('users').add({
        userId: newUser.user?.uid,
        username: username.toLowerCase(),
        fullName,
        emailAddress: emailAddress.toLowerCase(),
        following: [],
        dateCreated: Date.now(),
      });
      history.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message);
      setEmailAddress('');
      setPassword('');
      setFullName('');
      setUserName('');
    }
  };

  React.useEffect(() => {
    document.title = 'SignUp';
  }, []);

  return (
    <div className={s.container}>
      <div className={s.right}>
        <div className={s.top}>
          <h1 className={s.header}>
            <img src="images/logo.png" alt="Logo" />
          </h1>
          <p className={s.text}>
            Sign up to see photos and videos from your friends.{' '}
          </p>
          <div className={s.or}>OR</div>
          <Button className={s.btn} fullWidth>
            Login with google
          </Button>
          {error && <p className={s.error}>{error}</p>}
          <form onSubmit={handleSignUp}>
            <InputText
              placeholder="email"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
              className={s.input}
              id="email"
              autoComplete="on"
            />
            <InputText
              placeholder="fullname"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              className={s.input}
              id="fullname"
              autoComplete="on"
            />
            <InputText
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              className={s.input}
              id="username"
              autoComplete="on"
            />
            <InputText
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={s.input}
              type="password"
            />
            <Button
              type="submit"
              disabled={isInvalid}
              fullWidth
              className={s.btn}
            >
              Sign Up
            </Button>
            <div className={s.other}></div>
          </form>
        </div>
        <div className={s.register}>
          <p>
            Have an account? <Link to={ROUTES.LOGIN}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
