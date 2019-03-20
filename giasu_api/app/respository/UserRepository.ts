import {user as User} from '../entities/user';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm'; 

export default class UserRepository {
    private userRepo: Repository<User>;
    constructor(){
        this.userRepo = getRepository(User);
    }
    public async getAll(){
        return await this.userRepo.find();
    }
    // public async getOne(id:number) : Promise<ClassInfo>{
    //     return await this.classInfoRepo.findOne({"idClass": id});
    // }
    // public async delete(id){
    //     return await this.classInfoRepo.delete(id);
    // }

    // public async update(id, classInfo){
    //     return await this.classInfoRepo.update(id, classInfo);
    // }
    
    public async create(user: User){
        return await this.userRepo.save(user); 
    }
    
    // public async findBySubject (sub: string){
    //     return await this.classInfoRepo.findOne({"nameSubject": sub})
    // }
}