import {classinfo as ClassInfo} from '../entities/classinfo';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm';

export default class ClassInfoRepository {
    private classInfoRepo: Repository<ClassInfo>;
    constructor(){
        this.classInfoRepo = getRepository(ClassInfo);
    }
    public async getAll(){
        return await this.classInfoRepo.find();
    }
    public async getOne(id:number) : Promise<ClassInfo>{
        return await this.classInfoRepo.findOne({"idClass": id});
    }
    public async delete(id){
        return await this.classInfoRepo.delete(id);
    }

    public async update(id, classInfo){
        return await this.classInfoRepo.update(id, classInfo);
    }
    
    public async create(classInfo: ClassInfo){
        return await this.classInfoRepo.save(classInfo); 
    }
    
    public async findBySubject (sub: string){
        return await this.classInfoRepo.findOne({"nameSubject": sub})
    }
    public async searchClass (options){
        return await this.classInfoRepo.find(options);
    }
    public async findByIdUser (id: number){
        return await this.classInfoRepo.find({"idUser": id})
    }
}