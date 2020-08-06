import React from 'react';
import '../App.css';
import { motion } from 'framer-motion';
import axios from 'axios';

class Create extends React.Component {
    //CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {boardName: '', boardDescription: '', participants: []};
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addParticipant = this.addParticipant.bind(this);
    }
    
    //FUNCTIONS
    handleNameChange(event) {
        this.setState({boardName: event.target.value});
    }
    handleDescriptionChange(event) {
        this.setState({boardDescription: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/create',    //DEVELOPMENT
            //url: window.location.origin+'/api/create',  //PRODUCTION
            data: {
              boardName: this.state['boardName'],
              boardDescription: this.state['boardDescription'],
              participants: this.state['participants']
            }
          })
        .then(function (response) {
            window.location = window.location.origin+'/view/'+response.data.ops[0].id
        })
        .catch(function (error) {
            console.log(error);
            
        })
        .finally()
    }
    addParticipant() {
        let allParticipants = this.state.participants;
        allParticipants.push({'name':'', 'score': 0});
        this.setState({participants: allParticipants});
    }
    handleParticipantNameChange (index, event) {
        let allParticipants = this.state.participants;
        allParticipants[index].name = event.target.value;
        this.setState({participants: [...allParticipants]});
    }
    handleParticipantScoreChange (index, event) {
        let allParticipants = this.state.participants;
        allParticipants[index].score = event.target.value;
        this.setState({participants: [...allParticipants]});
    }
    deleteParticipant (index) {
        let allParticipants = this.state.participants;
        allParticipants.splice(index,1);
        this.setState({participants: [...allParticipants]});
    }

    //RENDERER
    render() {
        return (
            <>
                <h2>Create New Board</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" required value={this.state.boardName} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" required value={this.state.boardDescription} onChange={this.handleDescriptionChange} />
                    </label>
                    {
                        this.state.participants.map(
                            (item, index) => ( 
                                <>
                                    <label>
                                        Participant Name:
                                        <input type="text" required value={item.name} onChange={this.handleParticipantNameChange.bind(this, index)} />
                                    </label>
                                    <label>
                                        Participant Starting Score:
                                        <input type="number" required value={item.score} onChange={this.handleParticipantScoreChange.bind(this, index)} />
                                    </label>
                                    <button type="button" title="Delete participant" onClick={this.deleteParticipant.bind(this, index)}>x</button>
                                </>
                            )
                        )
                    }
                    <button type="button" onClick={this.addParticipant}>Add Participant</button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="submit" value="Submit">Submit </motion.button>
                </form>
            </>
        );
    }
}

export default Create;
