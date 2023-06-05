import React from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

function withSearchParams(Component) {
  function Wrapper(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    return (
      <Component
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        navigate={navigate}
        {...props}
      />
    );
  }
  return Wrapper;
}

export default withSearchParams;
