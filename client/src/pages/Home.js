import React from 'react';
import '../App.css';
import logo from '../images/bannerImage.svg';
import { motion } from "framer-motion"

function Home() {
  return (
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
  );
}

export default Home;
