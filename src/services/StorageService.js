import RequestService from './RequestService';
import {STORAGE_API} from '../configs/constants';

class StorageService extends RequestService {
    baseUrl = STORAGE_API;

    getRaces() {
        return this.get('');
    }

    async saveRace(userName, score, completionPercent) {
        const races = await this.getRaces();
        races.unshift({
            userName,
            score,
            completionPercent
        });
       return this.put('', races);
    }

}

export default new StorageService();
