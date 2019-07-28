import React from 'react';
import PropTypes from 'prop-types';

import Race from './race/Race';
import History from './history/History';
import Score from './score/Score';
import Modal from '../modal/Modal';
import LoginForm from './login-form/LoginForm';
import typingService from '../../services/TypingService';
import storageService from '../../services/StorageService';
import {formatText} from '../../utils/formatter';

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
            completionPercent: 0,
            status: GAME_STATUS.PENDING,
        }
    }

    async startRace() {
        try {
            const result = await typingService.getRaceText();
            this.setState((state) => ({
                    ...state,
                    raceText: formatText(result[0]),
                    score: 0,
                    completionPercent: 0,
                    status: GAME_STATUS.IN_PROGRESS
                })
            );
        } catch(e) {
            console.log("Something went terribly wrong: ", e);
        }
    }

    async completeRace(score, completionPercent) {
        this.setState((state) => ({
                ...state,
                score,
                completionPercent,
                raceText: '',
                status: GAME_STATUS.FINISHED
            })
        );
        try {
            const races = await storageService.saveRace(this.state.userName, score, completionPercent);
            this.setState((state) => ({
                    ...state,
                    races
                })
            );
        } catch(e) {
            console.log("Something went terribly wrong: ", e);
        }
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
        try {
            const races = await storageService.getRaces();
            this.setState((state) => ({
                    ...state,
                    races
                })
            );
        } catch (e) {
            console.log("Something went terribly wrong: ", e);
        }
    }

    render() {
        const {raceText, races, status, score, completionPercent, showModal} = this.state;
        return (
            <div>
                <main className="main">
                    <Modal show={showModal}>
                        <LoginForm onSubmit={(userName) =>  this.loginUser(userName)}></LoginForm>
                    </Modal>
                    <div className={`content ${showModal? 'content_off' : ''}`}>
                        <div className="content__item">
                            { status === GAME_STATUS.IN_PROGRESS && raceText && <Race text={raceText} onCompleted={(score, completionPercent) => this.completeRace(score, completionPercent)}/>}
                            { status !== GAME_STATUS.IN_PROGRESS &&  <button className="button" onClick={() => this.startRace()}> Click me to start</button>}
                            { status === GAME_STATUS.FINISHED &&
                            <>
                                <Score score={score} completionPercent={completionPercent} mode="primary"/>
                            </>}
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
