import React from 'react';

import Race from './race/Race';
import History from './history/History';
import Score from './score/Score';
import Modal from '../modal/Modal';
import LoginForm from './login-form/LoginForm';
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
            showModal: true,
            userName:'',
            raceText: '',
            score: 0,
            status: GAME_STATUS.PENDIND,
        }
    }

    async startRace() {
        try {
            const result = await typingService.getRaceText();
            this.setState((state) => ({
                    ...state,
                    raceText: result[0],
                    status: GAME_STATUS.IN_PROGRESS
                })
            );
        } catch(e) {
            console.log('Something went terribly wrong');
        }
    }

    completeRace(score) {
        this.setState((state) => ({
                ...state,
                score,
                raceText: '',
                status: GAME_STATUS.FINISHED
            })
        );
    }

    loginUser(userName) {
        this.setState((state) => ({
                ...state,
                userName,
                showModal: false
            })
        );
        this.props.onLogin(userName);
    }

    render() {
        const {
            raceText, status, score, showModal} = this.state;
        return (
            <div>
                <main className="main">
                    <Modal show={showModal}>
                        <LoginForm onSubmit={(userName) =>  this.loginUser(userName)}></LoginForm>
                    </Modal>
                    <div className={`content ${showModal? 'content_off' : ''}`}>
                        <div className="content__item">
                            { status === GAME_STATUS.IN_PROGRESS && raceText && <Race text={raceText} onCompleted={(score) => this.completeRace(score)}/>}
                            { status !==  GAME_STATUS.IN_PROGRESS &&  <button className="button" onClick={() => this.startRace()}> Click me to start</button>}
                            { status === GAME_STATUS.FINISHED && <Score score={score} mode="primary"/>}
                        </div>
                        <div className="content__item">
                            <History text=''/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

