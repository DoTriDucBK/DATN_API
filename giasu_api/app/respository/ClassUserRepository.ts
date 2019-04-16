import {class_user as ClassUser} from '../entities/class_user';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm';

export default class ClassUserRepository {
    private classUserRepo: Repository<ClassUser>;
    constructor(){
        this.classUserRepo = getRepository(ClassUser);
    }
    public async getAll(){
        return await this.classUserRepo.find();
    }
    
    public async create(classUser: ClassUser){
        return await this.classUserRepo.save(classUser); 
    }
    public async findByIdUser (id: number){
        return await this.classUserRepo.find({"idUser": id})
    }
    public async findByIdClass (id:number){
        return await this.classUserRepo.find({"idClass": id});
    }
    public async update(id, classUser){
        return await this.classUserRepo.update(id, classUser);
    }
}