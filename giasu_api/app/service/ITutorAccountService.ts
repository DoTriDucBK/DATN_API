import { tutor_login as TutorLogin } from "../entities/tutor_login";

export default interface ITutorAccountService {
    getAll(): Promise<Array<TutorLogin>>
    getOne(id: number): Promise<TutorLogin>
    getUserByToken(token: string): Promise<TutorLogin>
    register(tutorLogin: TutorLogin):Promise<TutorLogin>
    delete(id: number): Promise<TutorLogin>
    update(token: string, tutorLogin: TutorLogin): Promise<TutorLogin>
    findByEmail(email: string): Promise<TutorLogin>
    findByPhone(phone: any): Promise<TutorLogin>
    findByUsername(username: string) : Promise<TutorLogin>
    login( username: string, password: string): Promise<TutorLogin>
    logout(token: string): Promise<TutorLogin>;
    changePassword(token: string, data: object): Promise<TutorLogin>
}


