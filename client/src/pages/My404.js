import React, {useState, useEffect} from 'react';
import '../App.css';
import my404 from '../images/emptyStreet.svg';
import { motion } from "framer-motion"

function My404() {
  return (
    <div>
      <div className="bannerWrapper">
        <div className="homeBanner">
          <div className="homeBannerLeft">
            <h1>404</h1>
            <h2>
              Page not found
            </h2>
          </div>
          <div className="homeBannerRight">
            <img alt="An empty street" src={my404} />
          </div>
        </div>
    </div>
    </div>
  );
}

export default My404;
