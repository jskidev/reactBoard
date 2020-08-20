import React, { useState, useEffect } from 'react';
import '../App.css';
import {useParams} from 'react-router-dom';
import socketIOClient from "socket.io-client";
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
            data.participants.sort(function(a, b){
                return a.score-b.score
            }).reverse()
            setBoard(data);
        });
    }, []);

    useEffect(() => {
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

    return (
        <div>
            <h1>{board.title}</h1>
            <h2>{board.description}</h2>
            <a href={window.location.origin+'/edit/'+board.id}>Edit</a>
            <button type="button">Share</button>
            { !hasLoaded ? 'Loading' :
                board.participants.map(
                    (item, index) => ( 
                        <div>{index + 1}<strong>{item.name}</strong>{item.score}</div>
                    )
                )
            }
        </div>
    );
}

export default View;
