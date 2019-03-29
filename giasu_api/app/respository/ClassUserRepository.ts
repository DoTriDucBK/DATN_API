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
    // public async getOne(id:number) : Promise<ClassUser>{
    //     return await this.classUserRepo.findOne({"idUser": id});
    // }
    // public async delete(id){
    //     return await this.classInfoRepo.delete(id);
    // }

    // public async update(id, classInfo){
    //     return await this.classInfoRepo.update(id, classInfo);
    // }
    
    public async create(classUser: ClassUser){
        return await this.classUserRepo.save(classUser); 
    }
    
    // public async findBySubject (sub: string){
    //     return await this.classInfoRepo.findOne({"nameSubject": sub})
    // }
    // public async searchClass (options){
    //     return await this.classInfoRepo.find(options);
    // }
    public async findByIdUser (id: number){
        return await this.classUserRepo.find({"idUser": id})
    }
}