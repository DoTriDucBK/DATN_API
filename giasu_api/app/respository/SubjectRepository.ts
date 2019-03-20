import {subject as Subject} from '../entities/subject'
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm'

export default class SubjectRepository {
    private subjectRepo : Repository<Subject>

    constructor(){
        this.subjectRepo= getRepository(Subject)
    }
    public async getAll(): Promise<Array<Subject>>{
        return await this.subjectRepo.find();
    }
    public async getOne(id:number): Promise<Subject>{
        return await this.subjectRepo.findOne({"idSubject":id});
    }
    public async findByName (name: string):Promise<Subject>{
        return await this.subjectRepo.findOne({"nameSubject":name});
    }
}