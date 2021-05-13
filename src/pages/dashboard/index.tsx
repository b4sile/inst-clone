import React from 'react';
import { Header } from '../../components';
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
      <div>home</div>
    </div>
  );
};

export default Dashboard;
