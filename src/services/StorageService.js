import RequestService from './RequestService';
import {STORAGE_API} from '../configs/constants';

class StorageService extends RequestService {
    baseUrl = STORAGE_API;

    getRaces() {
        return this.get('');
    }

    async saveRace(userName, score) {
        const races = await this.getRaces();
        races.push({
            userName,
            score
        });
       return this.put('', races);
    }

}

export default new StorageService();
