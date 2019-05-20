import { admin as Admin } from '../entities/admin';
import { Repository, getConnectionManager, getConnection, getRepository } from 'typeorm';

export default class AdminRepository {
    private adminRepo: Repository<Admin>;
    constructor() {
        this.adminRepo = getRepository(Admin);
    }
    public async getAll() {
        return await this.adminRepo.find();
    }
    public async getOne(id: number): Promise<Admin> {
        return await this.adminRepo.findOne({"idAdmin": id });
    }
    public async create(user: Admin):Promise<Admin> {
        return await this.adminRepo.save(user);
    }
    public async update(id: number, user: Admin): Promise<Admin> {
        await this.adminRepo.update(id, user);
        return await this.getOne(id);
    }

    public async findByNameAdmin(username: string): Promise<Admin> {
        let user = await this.adminRepo.findOne({ "nameAdmin": username })
        return user;
    }
    public async findByIdAdmin (id:number){
        return await this.adminRepo.find({"idAdmin": id});
    }
    public async getAdminByName (name:string){
        return await this.adminRepo.find({"nameAdmin": name});
    }

    public async findByEmail(email: string): Promise<Admin> {
        let user = await this.adminRepo.findOne({ "emailAdmin": email })
        return user;
    }

    public async findByPhone(phone: string): Promise<Admin> {
        let user = await this.adminRepo.findOne({ "telAdmin": phone })
        return user;
    }
    public async findByToken(token: string) :Promise<Admin> {
        return await this.adminRepo.findOne({token: token})
    }
}