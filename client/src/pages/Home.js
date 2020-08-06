import React from 'react';
import '../App.css';
import logo from '../images/bannerImage.svg';
import { motion, useViewportScroll } from "framer-motion"

function Home() {
  return (
    <div>
    <div className="homeBanner">
      <motion.div animate={{ translateX: [-150, 0] }} transition={{ ease: "easeOut", duration: 2 }} className="homeBannerLeft">
        <h1>LeadTheBoard</h1>
        <motion.h2 animate={{ translateY: [75, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", delay: 2, duration: 1 }}>
          LeadTheBoard is a free, online leaderboard creation tool that allows you to easily setup, edit, and share leaderboards.
        </motion.h2>
        <motion.button animate={{ translateY: [75, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", delay: 2.5, duration: 1 }} type="button" className="primaryButton">
          GET STARTED
        </motion.button>
      </motion.div>
      <motion.div animate={{ translateX: [150, 0] }} transition={{ ease: "easeOut", duration: 2 }} className="homeBannerRight">
        <img src={logo} />
      </motion.div>
    </div>
    <div className="panel">
      <div className="panelContent">
        <h3>
          Create
        </h3>
        <p>
          Create a free leaderboard in seconds.
        </p>
      </div>
    </div>
    <div className="panelInverse">
      <div className="panelContent">
        <h3>
          Edit
        </h3>
        <p>
          Edit your leaderboard at any time.
        </p>
      </div>
    </div>
    <div className="panel">
      <div className="panelContent">
        <h3>
          Share
        </h3>
        <p>
          Share your leaderboard with anybody.
        </p>
      </div>
    </div>
    </div>
  );
}

export default Home;
