import { tutor_login as TutorLogin } from '../entities/tutor_login';
import { Repository, getConnectionManager, getConnection, getRepository } from 'typeorm';

export default class TutorLoginRepository {
    private tutorLoginRepo: Repository<TutorLogin>;
    constructor() {
        this.tutorLoginRepo = getRepository(TutorLogin);
    }
    public async getAll() {
        return await this.tutorLoginRepo.find();
    }
    public async getOne(id: number): Promise<TutorLogin> {
        return await this.tutorLoginRepo.findOne({"idTutorLogin": id });
    }
    public async create(tutorLogin: TutorLogin) {
        return await this.tutorLoginRepo.save(tutorLogin);
    }

    public async delete(id: number): Promise<TutorLogin> {
        let user = await this.getOne(id);
        await this.tutorLoginRepo.delete(id);
        return user;

    }
    public async update(id: number, tutorLogin: TutorLogin): Promise<TutorLogin> {
        await this.tutorLoginRepo.update(id, tutorLogin);
        return await this.getOne(id);
    }

    public async findByUserName(username: string): Promise<TutorLogin> {
        let user = await this.tutorLoginRepo.findOne({ "userNameTutor": username })
        return user;
    }

    public async findByEmail(email: string): Promise<TutorLogin> {
        let user = await this.tutorLoginRepo.findOne({ "emailUserTutor": email })
        return user;
    }

    public async findByPhone(phone: string): Promise<TutorLogin> {
        let user = await this.tutorLoginRepo.findOne({ "telUserTutor": phone })
        return user;
    }
    public async findByToken(token: string) :Promise<TutorLogin> {
        return await this.tutorLoginRepo.findOne({token: token})
    }

}