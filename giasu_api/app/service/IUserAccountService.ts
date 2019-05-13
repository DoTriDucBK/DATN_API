import { user as User } from "../entities/user";

export default interface IUserAccountService {
    getAll(): Promise<Array<User>>
    getOne(id: number): Promise<User>
    getUserByToken(token: string): Promise<User>
    register(user: User):Promise<User>
    delete(id: number): Promise<User>
    update(token: string, user: User): Promise<User>
    findByEmail(email: string): Promise<User>
    findByPhone(phone: any): Promise<User>
    findByUsername(username: string) : Promise<User>
    login( email: string, password: string, type:number): Promise<User>
    logout(token: string): Promise<User>;
    changePassword(token: string, data: object): Promise<User>
}


