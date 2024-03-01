// FullPageLoader.js
"use client"
import React, { useEffect } from 'react';
 

const FullPageLoader = ({label}) => {

  return (
    <div className="loader-overlay" id="loaderOverlay">
    <div className="loader-container">
      <div className="fullpageloader"></div>
    </div>
    <p className="loading-text">{label}</p>
  </div>
  );
};

export default FullPageLoader;
