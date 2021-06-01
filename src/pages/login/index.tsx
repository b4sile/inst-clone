import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, InputText } from '../../components';
import { ROUTES, VALUES } from '../../constants/routes';
import { FirebaseContext } from '../../context/firebase';
import s from './style.module.scss';

const Login = () => {
  const history = useHistory();
  const { firebase } = React.useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLogining, setIsLogining] = React.useState(false);

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInvalid) return;
    setIsLogining(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      setIsLogining(false);
      history.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message);
      setEmailAddress('');
      setPassword('');
      setIsLogining(false);
    }
  };

  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className={s.container}>
      <div className={s.right}>
        <div className={s.top}>
          <h1 className={s.header}>
            <img src={`${VALUES.LOGO}`} alt="Logo" />
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
              autoComplete="off"
            />
            <Button
              type="submit"
              disabled={isInvalid || isLogining}
              fullWidth
              className={s.btn}
              isLoading={isLogining}
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
