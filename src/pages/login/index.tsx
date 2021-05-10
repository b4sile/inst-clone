import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, InputText } from '../../components';
import { ROUTES } from '../../constants/routes';
import { FirebaseContext } from '../../context/firebase';
import s from './style.module.scss';

const Login = () => {
  const history = useHistory();
  const { firebase } = React.useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInvalid) return;
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message);
      setEmailAddress('');
      setPassword('');
    }
  };

  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className={s.container}>
      <div className={s.img}>
        <img src="images/iphone-with-profile.jpg" alt="LoginImg" />
      </div>
      <div className={s.right}>
        <div className={s.top}>
          <h1 className={s.header}>
            <img src="images/logo.png" alt="Logo" />
          </h1>
          {error && <p className={s.error}>{error}</p>}
          <form onSubmit={handleLogin}>
            <InputText
              placeholder="email"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
              className={s.input}
              id="email"
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
              Login
            </Button>
            <div className={s.or}>OR</div>
            <div className={s.other}>
              <Link to="/" className={s.google}>
                Login with google
              </Link>
              <Link to="/" className={s.forget}>
                Forget password?
              </Link>
            </div>
          </form>
        </div>
        <div className={s.register}>
          <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
