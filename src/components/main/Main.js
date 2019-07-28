import React from 'react';

import Race from './race/Race';
import History from './history/History';
import Score from './score/Score';

import typingService from '../../services/TypingService';

import './main.css';


const GAME_STATUS = {
    PENDIND: 0,
    IN_PROGRESS: 1,
    FINISHED: 2

}
export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            raceText: '',
            score: 0,
            status: GAME_STATUS.PENDIND
        }
    }

    async startRace() {
        try {
            const result = await typingService.getRaceText();
            this.setState({
                raceText: result[0],
                status: GAME_STATUS.IN_PROGRESS
            });
        } catch(e) {
            console.log('Something went terribly wrong');
        }
    }

    completeRace(score) {
        this.setState({
            raceText: '',
            score,
            status: GAME_STATUS.FINISHED

        })
    }

    render() {
        const {raceText, status, score} = this.state;
        return (
            <main className="main">
                <div className="main__item">
                    { status === GAME_STATUS.IN_PROGRESS && raceText && <Race text={raceText} onCompleted={(score) => this.completeRace(score)}/>}
                    { status !==  GAME_STATUS.IN_PROGRESS &&  <button className="start-button" onClick={() => this.startRace()}> Click me to start</button>}
                    { status === GAME_STATUS.FINISHED && <Score score={score} mode="primary"/>}
                </div>
                <div className="main__item">
                    <History text=''/>
                </div>
            </main>
        );
    }
}

