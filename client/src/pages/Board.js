import React, { useState, useEffect } from 'react';
import '../App.css';
import {useParams} from 'react-router-dom';
//const axios = require('axios');

function Board() {
    const [board, setBoard] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:8000/api/board/'+id) //DEVELOPMENT
        //fetch(window.location.origin+'/api/view/'+id) //PRODUCTION
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
    }, []);

    return (
        <div>
            <h1>{board.title}</h1>
            <h2>{board.description}</h2>
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

export default Board;
