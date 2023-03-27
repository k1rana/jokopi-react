import React from 'react';

import { useSearchParams } from 'react-router-dom';

function withSearchParams(Component) {
  function Wrapper(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
      <Component
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        {...props}
      />
    );
  }
  return Wrapper;
}

export default withSearchParams;
