import React from 'react';
import { Button, Header } from '../../components';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { selectUser } from '../../redux/slices/userSlice';
// import s from './style.module.scss';

const Dashboard = () => {
  // const user = useAppSelector(selectUser);
  // const dispatch = useAppDispatch();
  React.useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Button variant="outlined">home</Button>
        <Button>home</Button>
        <Button color="secondary">home</Button>
        <Button variant="outlined" color="secondary">
          home
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
