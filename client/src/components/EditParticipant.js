import React from 'react';
import '../App.css';

class EditParticipant extends React.Component {
    //CONSTRUCTOR
    /*constructor(props) {
        super(props);
    }*/

    //RENDERER
    render () {
        return (
            <>
                <label>
                    Participant Name:
                    <input type="text" value={this.props.name} onChange={() => this.props.onChangeName()} />
                </label>
                <label>
                    Participant Starting Score:
                    <input type="text" value={this.props.score} onChange={() => this.props.onChangeScore()} />
                </label>
            </>
        );
    }
}

export default EditParticipant;