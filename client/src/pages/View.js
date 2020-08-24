import React, { useState, useEffect } from 'react';
import '../App.css';
import './Create.css';
import './View.css';
import {useParams} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import { motion } from "framer-motion";
import empty from '../images/emptyBox.svg';
//const ENDPOINT = "http://localhost:8000/"; //DEVELOPMENT
const ENDPOINT = window.location.origin // PRODUCTION;
//const axios = require('axios');

function View() {
    const [board, setBoard] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("refreshData", data => {
            console.log('In View Socket')
            data.participants.sort(function(a, b){
                return a.score-b.score
            }).reverse()
            setBoard(data);
        });
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = "#F5F5F5"
        document.getElementsByClassName('formWrapper')[0].style.padding = 0;
        //fetch('http://localhost:8000/api/view/'+id) //DEVELOPMENT
        fetch(window.location.origin+'/api/view/'+id) //PRODUCTION
        .then(async res => {
            //console.log(res);
            return await res.json()
        })
        .then(result => {
            if(result.length > 0){
                result[0].participants.sort(function(a, b){
                    return a.score-b.score
                }).reverse()
                setBoard(result[0]);
                setHasLoaded(true);
            }
            
        });
    }, [id]);

    const handleClick = () => {
        window.location = window.location.origin+'/edit/'+board.id
    }

    const handleShareClick = () => {
        setViewModal(!viewModal)
        if(!viewModal){
            document.body.style.height = "100vh"
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.height = "inherit"
            document.body.style.overflowY = "inherit"
        }
    }

    return (
        <>
            <div className="jumbotron">
                <h2>{board.title}</h2>
                <p>{board.description}</p>
            </div>
            <div className="formWrapper">
                <div className="buttonWrapper">
                    <button type="button" className="secondaryButton" onClick={handleClick}>Edit Board</button>
                    <button type="button" className="altPrimaryButton" onClick={handleShareClick}>SHARE BOARD</button>
                </div>
                <div className="form board">
                    { !hasLoaded ? 'Loading' :
                        board.participants.length > 0 ?
                        board.participants.map(
                            (item, index) => ( 
                                <motion.div className="boardRow" animate={{ translateY: [25, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", duration: 2, delay: index/10 }}>
                                    <div className={"position rank-"+(index+1)}>
                                        {index + 1}
                                    </div>
                                    <div className="name">
                                        <strong>{item.name}</strong>
                                    </div>
                                    <div className="score">
                                        {item.score}
                                    </div>
                                </motion.div>
                            )
                        )
                        : 
                        <div className="empty">
                            <h3>No participants have been added to this board.</h3>
                            <img alt="Man carrying empty box" width="75%" src={empty} />
                        </div>
                    }
                </div>
            </div>
            {
                viewModal &&
                <div className="modalOverlay">
                <motion.div style={{opacity: viewModal ? 0 : 1}} className="modal" animate={{ translateY: [25, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", duration: 1 }}>
                    <h1>Share</h1>
                    <div className="modalBody">
                        <p>Share this link to allow <strong>read-only</strong> access to your board. Anybody with this link will be able to view live updates to this board, but cannot edit it.</p>
                        <div className="alert">
                            {window.location.origin + '/board/' + board.sid}
                        </div>
                        <p>Share this link to allow <strong>admin</strong> access to your board. Anybody with this link will be able to make changes to any part of your board.</p>
                        <div className="alert">
                            {window.location.origin + '/view/' + board.id}
                        </div>
                        <button className="altPrimaryButton" onClick={handleShareClick} >CLOSE</button>
                    </div>
                </motion.div>
            </div>
            }
        </>
    );
}

export default View;
