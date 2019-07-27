import RequestService from './RequestService';
import {TYPING_API} from '../configs/constants';

class TypingService extends RequestService {
    baseUrl = TYPING_API;

    getRaceText(paras = 2, type = 'meat-and-filler') {
        return this.get('', {
            paras,
            type
        });
    }

}

export default new TypingService();
