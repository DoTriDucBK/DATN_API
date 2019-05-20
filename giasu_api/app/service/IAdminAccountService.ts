import { admin as Admin } from "../entities/admin";

export default interface IAdminAccountService {
    getAll(): Promise<Array<Admin>>
    getOne(id: number): Promise<Admin>
    getAdminByToken(token: string): Promise<Admin>
    register(admin: Admin):Promise<Admin>
    update(token: string, admin: Admin): Promise<Admin>
    findByEmail(email: string): Promise<Admin>
    findByPhone(phone: any): Promise<Admin>
    findByNameAdmin(nameAdmin: string) : Promise<Admin>
    login( email: string, password: string): Promise<Admin>
    logout(token: string): Promise<Admin>;
    changePassword(token: string, data: object): Promise<Admin>
}


