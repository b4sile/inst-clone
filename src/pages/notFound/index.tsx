import React from 'react';

const NotFound = () => {
  React.useEffect(() => {
    document.title = 'Not Found';
  }, []);

  return <div>NotFound</div>;
};

export default NotFound;
