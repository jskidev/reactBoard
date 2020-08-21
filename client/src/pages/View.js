import React, { useState, useEffect } from 'react';
import '../App.css';
import './Create.css';
import './View.css';
import {useParams} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import { motion } from "framer-motion"
const ENDPOINT = "http://localhost:8000/"; //DEVELOPMENT
// const ENDPOINT = window.location.origin // PRODUCTION; 
//const axios = require('axios');

function View() {
    const [board, setBoard] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
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
        fetch('http://localhost:8000/api/view/'+id) //DEVELOPMENT
        //fetch(window.location.origin+'/api/view/'+id) //PRODUCTION
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

    return (
        <>
            <div className="jumbotron">
                <h2>{board.title}</h2>
                <p>{board.description}</p>
            </div>
            <div className="formWrapper">
                <div className="buttonWrapper">
                    <button type="button" className="secondaryButton" onClick={handleClick}>Edit Board</button>
                    <button type="button" className="altPrimaryButton">SHARE BOARD</button>
                </div>
                <div className="form">
                    { !hasLoaded ? 'Loading' :
                        board.participants.map(
                            (item, index) => ( 
                                <motion.div animate={{ translateY: [25, 0], opacity: [0, 1] }} transition={{ ease: "easeOut", duration: 2, delay: index/10 }}>{index + 1}<strong>{item.name}</strong>{item.score}</motion.div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default View;
