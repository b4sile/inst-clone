import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, InputText } from '../../components';
import { ROUTES } from '../../constants/routes';
import { FirebaseContext, FirebaseAuthError } from '../../context/firebase';
import s from './style.module.scss';

const SignUp = () => {
  const history = useHistory();
  const { firebase } = React.useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const isInvalid =
    password === '' ||
    emailAddress === '' ||
    fullName === '' ||
    userName === '';

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
    //   history.push(ROUTES.DASHBOARD);
    // } catch (err) {
    //   if (err instanceof FirebaseAuthError) {
    //     setError(err.message);
    //   }
    //   setEmailAddress('');
    //   setPassword('');
    // }
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
          <Link to="">
            <Button className={s.btn} fullWidth>
              Login with google
            </Button>
          </Link>
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
              value={userName}
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
