import React, {useState, useEffect} from 'react';
import '../App.css';
import logo from '../images/winner.svg';
import { motion } from "framer-motion"

function Home() {
  const [panel1Visible, setpanel1Visible] = useState(false);
  const [panel2Visible, setpanel2Visible] = useState(false);
  const [panel3Visible, setpanel3Visible] = useState(false);
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const [reachedScroll, setReachedScroll] = useState(false);

  const bodyColour = "#FFFFFF";

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setpanel1Visible(panel1Visible ? true : currentScrollPos > 240);
    setScrollToTopVisible(currentScrollPos > 240);
    setReachedScroll(reachedScroll ? true : currentScrollPos > 200);
    setpanel2Visible(panel2Visible ? true : currentScrollPos > 580);
    setpanel3Visible(panel3Visible ? true : currentScrollPos > 780);
  };

  useEffect(() => {
    document.body.style.backgroundColor = bodyColour
  }, [bodyColour])

  useEffect(() => {
    handleScroll(); //Fire function on page load. Will show elements if user refreshes page below the fold.
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [handleScroll]);

  const handleClick = () => {
    window.location = '/create'
  }

  const handleGoToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
            <img alt="Two people cheering next to trophy" src={logo} />
          </motion.div>
        </div>
        <motion.div animate={{ translateY: [75, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", delay: 3.25, duration: 1 }} className="panelHeader">
          <h3>
            How it works
          </h3>
          <a href="#HowItWorks">
            <svg class="downArrow" height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#7856ff" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 4)"><path d="m7.328 6.67.001 5.658-5.658-.001" transform="matrix(-.70710678 .70710678 .70710678 .70710678 .965201 -.399799)"/><path d="m4.5.5v13"/></g></svg>
          </a>
        </motion.div>
    </div>
    
    
    <div className="panelLeft">
      <a name="HowItWorks"></a>
      <div className={panel1Visible ? 'panelContent easeInLeft' : 'panelContent'}>
        <div className="panelIcon">
          <svg height="40" viewBox="0 0 21 21" width="40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#7856FF" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 3)"><path d="m8 16c4.4380025 0 8-3.5262833 8-7.96428571 0-4.43800246-3.5619975-8.03571429-8-8.03571429-4.43800245 0-8 3.59771183-8 8.03571429 0 4.43800241 3.56199755 7.96428571 8 7.96428571z"/><path d="m4 8h8"/><path d="m8 12.0563492v-8.0563492z"/></g></svg>
        </div>
        <div>
          <h3>
            Create
          </h3>
          <h4>
            Create a free online leaderboard.
          </h4>
          <p>
            No app installation required. Simply enter a name and description for your board and any starting participants and scores.
          </p>
        </div>
      </div>
    </div>
    <div className="panelMid">
      <div className={panel2Visible ? 'panelContent easeInLeft' : 'panelContent'}>
        <div className="panelIcon">
        <svg height="40" viewBox="0 0 21 21" width="40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#7856FF" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><path d="m7 2.5h-4.5c-1.1045695 0-2 .8954305-2 2v9.0003682c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5003682"/><path d="m9.49086518-.60570641c.79784342.01307433 1.43777452.66357797 1.43777452 1.46152846v9.87574095l-1.41421359 2.8284271-1.41421356-2.8284271-.04115759-9.92287518c-.00322702-.77801908.62486604-1.41134419 1.40288513-1.41457122.00964205-.00003999.01928425.00001901.02892509.00017699z" transform="matrix(.70710678 .70710678 -.70710678 .70710678 7.360659 -4.816202)"/><path d="m12.5 3.5.953 1"/></g></svg>
        </div>
        <div>
          <h3>
            Edit
          </h3>
          <h4>
            Edit your leaderboard at any time.
          </h4>
          <p>
            Edit any part of your board and have your updates available instantly to everyone viewing your board.
          </p>
        </div>
      </div>
    </div>
    <div className="panelRight">
      <div className={panel3Visible ? 'panelContent easeInLeft' : 'panelContent'}>
        <div className="panelIconShare">
        <svg height="40" viewBox="0 0 21 21" width="40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#7856FF" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path d="m10.326 1.666.016 5.641-5.673.016" transform="matrix(.70710678 -.70710678 -.70710678 -.70710678 5.376348 12.979652)"/><path d="m7.522.521v11.979"/><path d="m4.5 7.5h-2c-1.1045695 0-2 .8954305-2 2v4c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4c0-1.1045695-.8954305-2-2-2h-2"/></g></svg>
        </div>
        <div>
          <h3>
            Share
          </h3>
          <h4>
            Share your leaderboard with anybody.
          </h4>
          <p>
            Send your shareable link to allow participants to view your board, or send your adming link to allow admins to edit your board.
          </p>
        </div>
      </div>
    </div>
      <svg onClick={handleGoToTop} style={{visibility:reachedScroll ? 'visible' : 'hidden'}} className={scrollToTopVisible ? 'upArrow visible' : 'upArrow hidden'} height="40" viewBox="0 0 21 21" width="40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#7856ff" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 4)"><polyline points="7.324 1.661 7.324 7.318 1.647 7.339" transform="scale(1 -1) rotate(45 15.35 0)"/><line x1="4.5" x2="4.5" y1=".5" y2="13.5"/></g></svg>
    </div>
  );
}

export default Home;
