import {tutor_login as TutorLogin} from '../entities/tutor_login';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm';

export default class TutorLoginRespository {
    private tutorLoginRepo: Repository<TutorLogin>;
    constructor(){
        this.tutorLoginRepo = getRepository(TutorLogin);
    }
    public async getAll() {
        return await this.tutorLoginRepo.find();
    }
    public async create (tutor_login: TutorLogin){
        return await this.tutorLoginRepo.save(tutor_login);
    }
}