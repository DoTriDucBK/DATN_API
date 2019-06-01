import IAdminAccountService from "./IAdminAccountService";
import AdminRepository from "../respository/AdminRespository";
import { admin as Admin } from "../entities/admin";
import { MyUtil } from "../utils/MyUtils";
import { Utils } from "../utils/Validate";


export default class AdminAccountService implements IAdminAccountService {

    private adminRepo: AdminRepository;

    constructor() {
        this.adminRepo = new AdminRepository();
    }

    public async getAll(): Promise<Array<Admin>> {
        return await this.adminRepo.getAll();
    }

    public async getOne(id: number): Promise<Admin> {
        if (!id) throw new Error("admin's id is not true!")
        return await this.adminRepo.getOne(id);
    }

    public async getAdminByToken(token: string): Promise<Admin> {
        if (!token) throw new Error("Token is invalid!");
        var admin = new Admin();
        await this.adminRepo.findByToken(token)
            .then(data => admin = data)
            .catch(err => console.log(err))
        if (!admin) throw new Error("Token is not existed!");
        var id = MyUtil.getUserIdByToken(token);
        if (id <= 0 || (!id) || (admin.idAdmin !== id)) throw new Error("Token is not true!")
        return admin;
    }

    public async register(admin: Admin): Promise<Admin> {
        if (!admin) throw new Error("User is not null!")
        if (admin.nameAdmin) {
            if (!Utils.checkUsername(admin.nameAdmin)) throw new Error("Username is not true format")
            else await this.adminRepo.findByNameAdmin(admin.nameAdmin)
                .then(data => {
                    if (data) throw new Error("User is existed!!")
                })
                .catch(err => { throw new Error(err) })
        }

        if (admin.emailAdmin) {
            if (!Utils.isEmailAddress(admin.emailAdmin)) throw new Error("Email is not true format")
            else await this.adminRepo.findByEmail(admin.emailAdmin)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (admin.telAdmin) {
            if (!Utils.isPhoneNumber(admin.telAdmin)) throw new Error("Phone is not true format")
            else await this.adminRepo.findByPhone(admin.telAdmin)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (admin.password && Utils.checkPassword(admin.password)) {
            admin.password = MyUtil.getHashPass(admin.password);
        } else throw new Error("Password is not true format")

    

        admin.adminCreate = new Date();

        var result = null;
        await this.adminRepo.create(admin)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        console.log(result);
        if (!result) throw new Error("Error creating a new user")

        result.token = MyUtil.getToken(result);
        await this.adminRepo.update(result.idAdmin, result)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        return result;
    }


    public async update(token: string, adminAccount: Admin): Promise<Admin> {
        var admin = new Admin();
        if (!token) throw new Error("Token is invalid!!");

        await this.adminRepo.findByToken(token)
            .then(data => admin = data)
            .catch(err => console.log(err))
        if (!admin) throw new Error("Token is not true");

        var id = MyUtil.getAdminIdByToken(token);
        if ((!id) || (id <= 0) || (admin.idAdmin !== id)) throw new Error("Token is not true!");

        adminAccount.idAdmin = id;
        var check = false;
        var isPhone = false;

        if (adminAccount.nameAdmin) {
            let user1 = new Admin();
            await this.adminRepo.findByNameAdmin(adminAccount.nameAdmin)
                .then(data => user1 = data)
                .catch(err => console.log(err))
            if (!user1) check = check && true;
            else {
                if (user1.nameAdmin === admin.nameAdmin) check = check && true;
                else throw new Error("username is existed!!")
            }
        }

        if (adminAccount.password) {
            if (!Utils.checkPassword(adminAccount.password)) throw new Error("Password is not true format");
            adminAccount.password = MyUtil.getHashPass(adminAccount.password);
        }
        adminAccount.token = MyUtil.getTokenAdmin(adminAccount)
        adminAccount.adminCreate = new Date();
        console.log("user account: ", adminAccount);
        return await this.adminRepo.update(id, adminAccount);
    }

    
    public async findByNameAdmin(nameAdmin: string): Promise<Admin> {
        return await this.adminRepo.findByNameAdmin(nameAdmin);
    }

    public async findByEmail(email: string): Promise<Admin> {
        return await this.adminRepo.findByEmail(email);
    }

    public async findByPhone(phone: any): Promise<Admin> {
        return await this.adminRepo.findByPhone(phone);
    }

    public async login(email: string, password: string): Promise<Admin> {

        if (!email || !password) throw new Error("Data is not enough!");

            let admin = new Admin();
            await this.adminRepo.findByEmail(email)
                .then(data => admin = data)
                .catch(err => console.log(err))
           
            if (!admin) throw new Error("Username is not true!")

            let checkPassword = MyUtil.checkPass(password, admin.password);
            console.log("checkPassword", checkPassword)
            if (!checkPassword) throw new Error("Password is not true!");

            admin.token = MyUtil.getTokenAdmin(admin);
            admin.adminLastLogin = new Date();
            admin.adminUpdate = new Date();
            await this.adminRepo.update(admin.idAdmin, admin)
                .then(data => admin = data)
                .catch(err => { throw new Error(err) })
            return admin
    }

    public async logout(token: string): Promise<Admin> {
        var user = new Admin();
        if (!token) throw new Error("Token is invalid!!");

        await this.adminRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed");

        var id = MyUtil.getAdminIdByToken(token);
        if (!id || (id <= 0) || (user.idAdmin !== id)) throw new Error("Token is not true!");

        user.token = "";
        user.adminUpdate = new Date();
        await this.adminRepo.update(user.idAdmin, user)
            .then(data => user = data)
            .catch(err => { throw new Error(err) })
        return user
    }
    public async changePassword(token: string, data: object) {
        var user = new Admin();
        return user;
    }
}