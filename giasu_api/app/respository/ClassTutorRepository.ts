import {class_tutor as ClassTutor} from '../entities/class_tutor';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm';

export default class ClassTutorRepository {
    private classTutorRepo: Repository<ClassTutor>;
    constructor(){
        this.classTutorRepo = getRepository(ClassTutor);
    }
    public async getAll(){
        return await this.classTutorRepo.find();
    }
    public async getOne(id:number) : Promise<ClassTutor>{
        return await this.classTutorRepo.findOne({"idClass": id});
    }
    public async delete(id){
        return await this.classTutorRepo.delete(id);
    }

    public async update(id, classTutor){
        return await this.classTutorRepo.update(id, classTutor);
    }
    
    public async create(classTutor: ClassTutor){
        return await this.classTutorRepo.save(classTutor); 
    }
    public async findByIdUser (id: number){
        return await this.classTutorRepo.find({"idUser": id})
    }
    public async findByIdTutor (id:number){
        return await this.classTutorRepo.find({"idTutor": id})
    }
    public async findByIdClass (id:number){
        return await this.classTutorRepo.find({"idClass":id})
    }
    public async findNotification (options){
        return await this.classTutorRepo.find(options)
    }
}