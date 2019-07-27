import React from 'react';

import Race from '../race/Race';
import History from '../history/History';
import typingService from '../../services/TypingService';
import './main.css';



export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            raceText: '',
        }
    }

    async startRace() {
        try {
            const result = await typingService.getRaceText();
            this.setState({raceText: result[0]});
        } catch(e) {
            console.log('Something went terribly wrong');
        }
    }

    resetRace() {
        this.setState({
            raceText: '',
        })
    }

    render() {
        return (
            <main className="main">
                <div className="main__item">
                    {this.state.raceText
                        ? <Race text={this.state.raceText} onCompleted={() => this.resetRace()}/>
                        : <button className="start-button" onClick={() => this.startRace()}> Click me to start</button> }
                </div>
                <div className="main__item">
                    <History text=''/>
                </div>
            </main>
        );
    }
}

