import React from 'react';
import '../App.css';
import './Create.css';
import axios from 'axios';

class Create extends React.Component {
    //CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {boardName: '', boardDescription: '', participants: [], isSubmitted: false};
    
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
        this.setState({isSubmitted: true})
        axios({
            method: 'post',
            //url: 'http://localhost:8000/api/create',    //DEVELOPMENT
            url: window.location.origin+'/api/create',  //PRODUCTION
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
            this.setState({isSubmitted: false})
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

    componentDidMount() {
        document.body.style.backgroundColor = "#F5F5F5"
    }

    //RENDERER
    render() {
        return (
            <>
                <div className="jumbotron">
                    <h2>Create Your New Board</h2>
                </div>
                <div className="formWrapper">
                    <div className="form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="formHeader">
                                <h3>Details</h3>
                                <div className="wrapper">
                                    <label>
                                        <h4>Name</h4>
                                        <input placeholder="Board name" type="text" required value={this.state.boardName} onChange={this.handleNameChange} />
                                    </label>
                                    <label>
                                        <h4>Description</h4>
                                        <input placeholder="Board description" type="text" required value={this.state.boardDescription} onChange={this.handleDescriptionChange} />
                                    </label>
                                </div>
                            </div>
                            {
                                this.state.participants.length > 0 ? 
                                <div className="participants">
                                    <h3>Participants</h3>
                                {
                                    this.state.participants.map(
                                        (item, index) => ( 
                                            <div key={index} className="visible">
                                                <div className="nameWrapper">
                                                    <label className="labelWrapper">
                                                        <h4>Participant {index + 1} Name</h4>
                                                        <input placeholder="Name" type="text" required value={item.name} onChange={this.handleParticipantNameChange.bind(this, index)} />
                                                    </label>
                                                </div>
                                                <div className="scoreWrapper">
                                                    <label className="labelWrapper">
                                                        <h4>Participant {index + 1} Score</h4>
                                                        <input placeholder="Participant score" type="number" min="0" required value={item.score} onChange={this.handleParticipantScoreChange.bind(this, index)} />
                                                        <button type="button" title="Delete participant" onClick={this.deleteParticipant.bind(this, index)}>
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
                                {
                                    !this.state.isSubmitted ?
                                    <button className ="secondaryButton" type="button" disabled={this.state.participants.length >= 100} onClick={this.addParticipant}>ADD PARTICIPANT</button>
                                    : ''
                                }
                                <button style={{color: this.state.isSubmitted ? '#7856FF' : '#FFFFFF'}} disabled={this.state.isSubmitted} className="altPrimaryButton" type="submit" value="Submit">
                                    {
                                        this.state.isSubmitted ?
                                        <span class="spinner"></span>
                                        : 'CREATE BOARD'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Create;
