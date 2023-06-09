import React from "react";

import { connect } from "react-redux";

const PromoNotFound = (props) => {
  return <div>PromoNotFound</div>;
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PromoNotFound);
