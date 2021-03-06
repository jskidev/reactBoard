import React, { useState, useEffect } from 'react';
import '../App.css';
import './Create.css';
import './View.css';
import {useParams} from 'react-router-dom';
import { motion } from "framer-motion";
import socketIOClient from "socket.io-client";
import empty from '../images/emptyBox.svg';
//const ENDPOINT = "http://localhost:8000/"; //DEVELOPMENT
const ENDPOINT = window.location.origin // PRODUCTION;
//const axios = require('axios');

function Board() {
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
        //fetch('http://localhost:8000/api/board/'+id) //DEVELOPMENT
        fetch(window.location.origin+'/api/board/'+id) //PRODUCTION
        .then(async res => {
            //console.log(res);
            return await res.json()
        })
        .then(result => { 
            console.log(result);
            if(result.length > 0){
                result[0].participants.sort(function(a, b){
                    return a.score-b.score
                }).reverse()
                setBoard(result[0]);
                setHasLoaded(true);
            }
            
        });
    }, [id]);

    return (
        <>
            <div className="jumbotron">
                <h2>{board.title}</h2>
                <p>{board.description}</p>
            </div>
            <div className="formWrapper">
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
        </>
    );
}

export default Board;
