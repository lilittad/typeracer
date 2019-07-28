import RequestService from './RequestService';
import {TYPING_API} from '../configs/constants';

class TypingService extends RequestService {
    baseUrl = TYPING_API;

    getHistory() {
        return this.get('');
    }

    saveGame() {
        return this.post('');
    }

}

export default new TypingService();
