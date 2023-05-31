import React from "react";

import loadingImage from "../assets/images/loading.svg";

function Loading() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center flex-col">
      <div>
        <img src={loadingImage} alt="" />
      </div>
    </section>
  );
}

export default Loading;
