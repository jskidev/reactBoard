import React, {useState, useEffect} from 'react';
import '../App.css';
import logo from '../images/jumbotronCrop.png';
import arrow from '../images/arrowDown.svg';
import { motion } from "framer-motion"

function Home() {
  const [panel1Visible, setpanel1Visible] = useState(false);
  const [panel2Visible, setpanel2Visible] = useState(false);
  const [panel3Visible, setpanel3Visible] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setpanel1Visible(panel1Visible ? true : currentScrollPos > 80);
    setpanel2Visible(panel2Visible ? true : currentScrollPos > 390);
    setpanel3Visible(panel3Visible ? true : currentScrollPos > 700);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [handleScroll]);

  const handleClick = () => {
    window.location = '/create'
  }

  return (
    <div>
      <div className="bannerWrapper">
        <div className="homeBanner">
          <motion.div animate={{ translateX: [-150, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", duration: 2 }} className="homeBannerLeft">
            <h1>LeadTheBoard</h1>
            <motion.h2 animate={{ translateY: [75, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", delay: 2, duration: 1 }}>
              LeadTheBoard is a free, online leaderboard creation tool that allows you to easily setup, edit, and share leaderboards.
            </motion.h2>
            <motion.button animate={{ translateY: [75, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", delay: 2.5, duration: 1 }} type="button" className="primaryButton" onClick={handleClick}>
              GET STARTED
            </motion.button>
          </motion.div>
          <motion.div animate={{ translateX: [150, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", duration: 2 }} className="homeBannerRight">
            <img alt="Woman in front of leaderboard" src={logo} />
          </motion.div>
        </div>
        <div className="panelHeader">
        <h3>
          How it works
        </h3>
        <a href="#HowItWorks"><img alt="Down Arrow" src={arrow} width="30px"/></a>
    </div>
    </div>
    
    
    <div className="panel">
      <a name="HowItWorks"></a>
      <div className={panel1Visible ? 'panelContent easeInLeft' : 'panelContent'}>
        <h3>
          Create
        </h3>
        <p>
          Create a free leaderboard in seconds.
        </p>
      </div>
    </div>
    <div className="panelInverse">
      <div className={panel2Visible ? 'panelContent easeInRight' : 'panelContent'}>
        <h3>
          Edit
        </h3>
        <p>
          Edit your leaderboard at any time.
        </p>
      </div>
    </div>
    <div className="panel">
      <div className={panel3Visible ? 'panelContent easeInLeft' : 'panelContent'}>
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
