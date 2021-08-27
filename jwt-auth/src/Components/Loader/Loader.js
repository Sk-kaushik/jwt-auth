import React from "react";
import LoaderGif from "../../Assets/loader.gif";
import "../../styles/loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <img src={LoaderGif} alt="" />
    </div>
  );
};

export default Loader;
