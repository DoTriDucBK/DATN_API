import {tutor as Tutor} from '../entities/tutor';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm';

export default class TutorRepository {
    private tutorRepo: Repository<Tutor>;
    constructor(){
        this.tutorRepo = getRepository(Tutor);
    }
    public async getAll(){
        return await this.tutorRepo.find();
    }
    public async getOne(id:number) : Promise<Tutor>{
        return await this.tutorRepo.findOne({"idTutor": id});
    }
    public async delete(id){
        return await this.tutorRepo.delete(id);
    }

    public async update(id, tutor){
        return await this.tutorRepo.update(id, tutor);
    }
    
    public async create(tutor: Tutor): Promise<Tutor> {
        return await this.tutorRepo.save(tutor);
    }
    
    public async findBySubject (sub: string){
        return await this.tutorRepo.find({"nameSubject": sub})
    }
    public async findTutor (options){
        return await this.tutorRepo.find(options)
    }
}