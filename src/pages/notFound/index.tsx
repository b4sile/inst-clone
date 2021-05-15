import React from 'react';
import { Header } from '../../components';

const NotFound = () => {
  React.useEffect(() => {
    document.title = 'Not Found';
  }, []);

  return (
    <div>
      <Header />
      NotFound
    </div>
  );
};

export default NotFound;
