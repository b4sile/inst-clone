import React from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase';
import s from './style.module.scss';

const Login = () => {
  const history = useHistory();
  const { firebase } = React.useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = () => {};

  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return <div>Login page</div>;
};

export default Login;
