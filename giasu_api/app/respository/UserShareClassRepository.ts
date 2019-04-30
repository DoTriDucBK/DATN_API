import {user_user as UserUser} from '../entities/user_user';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm';

export default class UserShareClassRepository {
    private userShareClassRepo: Repository<UserUser>;
    constructor(){
        this.userShareClassRepo = getRepository(UserUser);
    }
    public async getAll(){
        return await this.userShareClassRepo.find();
    }
    
    public async create(userClassShare: UserUser){
        return await this.userShareClassRepo.save(userClassShare); 
    }
    public async findByIdUser (id: number){
        return await this.userShareClassRepo.find({"idUser": id})
    }
    public async findByIdClass (id:number){
        return await this.userShareClassRepo.find({"idClass": id});
    }
    public async findByIdUserOfClass (id:number){
        return await this.userShareClassRepo.find({"idUserOfClass":id});
    }
    public async update(id, classUser){
        return await this.userShareClassRepo.update(id, classUser);
    }
    public async findNotification (options){
        return await this.userShareClassRepo.find(options)
    }
}