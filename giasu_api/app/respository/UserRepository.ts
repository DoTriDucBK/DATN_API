import { user as User } from '../entities/user';
import { Repository, getConnectionManager, getConnection, getRepository } from 'typeorm';

export default class UserRepository {
    private userRepo: Repository<User>;
    constructor() {
        this.userRepo = getRepository(User);
    }
    public async getAll() {
        return await this.userRepo.find();
    }
    public async getOne(id: number): Promise<User> {
        return await this.userRepo.findOne({"idUser": id });
    }
    public async create(user: User):Promise<User> {
        return await this.userRepo.save(user);
    }
    public async delete(id: number): Promise<User> {
        let user = await this.getOne(id);
        await this.userRepo.delete(id);
        return user;

    }
    public async update(id: number, user: User): Promise<User> {
        await this.userRepo.update(id, user);
        return await this.getOne(id);
    }

    public async findByUserName(username: string): Promise<User> {
        let user = await this.userRepo.findOne({ "userName": username })
        return user;
    }
    public async findByIdUser (id:number){
        return await this.userRepo.find({"idUser": id});
    }
    public async getUserByName (name:string){
        return await this.userRepo.find({"userName": name});
    }

    public async findByEmail(email: string): Promise<User> {
        let user = await this.userRepo.findOne({ "emailUser": email })
        return user;
    }

    public async findByPhone(phone: string): Promise<User> {
        let user = await this.userRepo.findOne({ "telUser": phone })
        return user;
    }
    public async findByToken(token: string) :Promise<User> {
        return await this.userRepo.findOne({token: token})
    }
    public async findUser (options){
        return await this.userRepo.find(options)
    }

}