import React, { useState, useEffect } from 'react';
import '../App.css';
import {useParams} from 'react-router-dom';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000/"; //DEVELOPMENT
// const ENDPOINT = window.location.origin // PRODUCTION; 
const axios = require('axios');

function Edit() {
    const [board, setBoard] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [participants, setParticipants] = useState([]);
    let { id } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        const socket = socketIOClient(ENDPOINT);
            socket.emit('refreshData', 
            {
                title: boardName,
                description: boardDescription,
                participants: participants,
                id: board.id
            } 
        );
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/edit/'+id, //DEVELOPMENT
            //url: window.location.origin+'/api/edit/'+id  //PRODUCTION
            data: {
              boardName: boardName,
              boardDescription: boardDescription,
              participants: participants,
              id: board._id
            }
          })
        .then(function (response) {
            window.location = window.location.origin+'/view/'+id
        })
        .catch(function (error) {
            console.log(error);
            
        })
        .finally()
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#F5F5F5"
        fetch('http://localhost:8000/api/view/'+id) //DEVELOPMENT
        //fetch(window.location.origin+'/api/view/'+id) //PRODUCTION
        .then(async res => {
            //console.log(res);
            return await res.json()
        })
        .then(result => { 
            console.log(result);
            if(result){
                result[0].participants.sort(function(a, b){
                    return a.score-b.score
                }).reverse()
                setBoard(result[0]);
                let board = result[0];
                setBoardName(board.title);
                setBoardDescription(board.description);
                setParticipants(board.participants);
                setHasLoaded(true);
            }
            
        });
    }, [id]);

    return (
        <>
            <div className="jumbotron">
                <h2>Edit Your Board</h2>
                <p>All changes you make here will be instantly available to anyone viewing your board.</p>
            </div>
            <div className="formWrapper">
                <div className="form">
                { !hasLoaded ? 'Loading' :
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="formHeader">
                            <h3>Details</h3>
                            <div className="wrapper">
                                <label>
                                    <h4>Name</h4>
                                    <input placeholder="Board name" type="text" required value={boardName} onChange={e => setBoardName(e.target.value)} />
                                </label>
                                <label>
                                    <h4>Description</h4>
                                    <input placeholder="Board description" type="text" required value={boardDescription} onChange={e => setBoardDescription(e.target.value)} />
                                </label>
                            </div>
                        </div>
                        {  
                            participants.length > 0 ? 
                            <div className="participants">
                                <h3>Participants</h3>
                            {
                                participants.map(
                                    (item, index) => ( 
                                        <div key={index} className="visible">
                                            <div className="nameWrapper">
                                                <label className="labelWrapper">
                                                    <h4>Participant {index + 1} Name</h4>
                                                    <input placeholder="Name" type="text" required value={item.name} onChange={e => { participants[index].name = e.target.value; setParticipants([...participants]); }} />
                                                </label>
                                            </div>
                                            <div className="scoreWrapper">
                                                <label className="labelWrapper">
                                                    <h4>Participant {index + 1} Score</h4>
                                                    <input placeholder="Participant score" type="number" min="0" required value={item.score} onChange={e => { participants[index].score = e.target.value; setParticipants([...participants]); }} />
                                                    <button type="button" title="Delete participant" onClick={e => { participants.splice(index, 1); setParticipants([...participants]); }}>
                                                        x
                                                    </button>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                            </div>
                            : ''
                        }
                        <div className="formFooter">
                            <button className ="secondaryButton" type="button" disabled={participants.length >= 100} onClick={e => { participants.push({name:'', score:0}); setParticipants([...participants]); }}>Add Participant</button>
                            <button className="altPrimaryButton" type="submit" value="Submit">SAVE BOARD</button>
                        </div>
                    </form>
                }
                </div>
            </div>
        </>
    );
}

export default Edit;
