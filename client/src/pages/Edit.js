import React, { useState, useEffect } from 'react';
import '../App.css';
import {useParams} from 'react-router-dom';
import { motion } from 'framer-motion';
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
            console.log(response);
            window.location = window.location.origin+'/view/'+id
        })
        .catch(function (error) {
            console.log(error);
            
        })
        .finally()
    }

    useEffect(() => {
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
    }, []);

    return (
        <div>
            { !hasLoaded ? 'Loading' :
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Name:
                    <input type="text" required value={boardName} onChange={e => setBoardName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" required value={boardDescription} onChange={e => setBoardDescription(e.target.value)} />
                </label>
                {participants.map((item, index) => (
                    <>
                    <label>
                        Participant Name:
                        <input key={index} value={item.name}  onChange={e => { participants[index].name = e.target.value; setParticipants([...participants]); }} />
                    </label>
                    <label>
                        Participant Score:
                        <input key={index} value={item.score}  onChange={e => { participants[index].score = e.target.value; setParticipants([...participants]); }} />
                    </label>
                    <button type="button" title="Delete participant" onClick={e => { participants.splice(index, 1); setParticipants([...participants]); }}>x</button>
                    </>
                ))}
                <button type="button" onClick={e => { participants.push({name:'', score:0}); setParticipants([...participants]); }}>Add Participant</button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="submit" value="Submit">Submit </motion.button>
            </form>
            }
        </div>
    );
}

export default Edit;
