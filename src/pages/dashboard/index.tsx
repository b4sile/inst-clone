import React from 'react';
import { Header } from '../../components';
import s from './style.module.scss';

const Dashboard = () => {
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
