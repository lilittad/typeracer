import React from 'react';
import PropTypes from 'prop-types';

import Race from './race/Race';
import History from './history/History';
import Score from './score/Score';
import Modal from '../modal/Modal';
import LoginForm from './login-form/LoginForm';
import typingService from '../../services/TypingService';
import storageService from '../../services/StorageService';

import './main.css';


const GAME_STATUS = {
    PENDING: 0,
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
            races:[],
            score: 0,
            status: GAME_STATUS.PENDING,
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

    async completeRace(score) {
        this.setState((state) => ({
                ...state,
                score,
                raceText: '',
                status: GAME_STATUS.FINISHED
            })
        );
        const races = await storageService.saveRace(this.state.userName, score);
        this.setState((state) => ({
                ...state,
                races
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
        this.getRaces();
    }

    async getRaces() {
        const races = await storageService.getRaces();
        this.setState((state) => ({
                ...state,
                races
            })
        );
    }

    render() {
        const {raceText, races, status, score, showModal} = this.state;
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
                            <History races={races}/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

Main.propTypes = {
    onLogin: PropTypes.func.isRequired,
};
