import IUserAccountService from "./IUserAccountService";
import UserRepository from "../respository/UserRepository";
import { user as User, user } from "../entities/user";
import { MyUtil } from "../utils/MyUtils";
import { Utils } from "../utils/Validate";


export default class UserAccountService implements IUserAccountService {

    private userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    public async getAll(): Promise<Array<User>> {
        return await this.userRepo.getAll();
    }

    public async getOne(id: string): Promise<User> {
        var idUser = parseInt(id);
        if (idUser <= 0 || (!id)) throw new Error("User's id is not true!")
        return await this.userRepo.getOne(id);
    }

    public async getUserByToken(token: string): Promise<User> {
        if (!token) throw new Error("Token is invalid!");
        var user = new User();
       
        return user;
    }

    public async register(user: User): Promise<User> {
        console.log("//////////////", user)
        if (!user) throw new Error("User is not null!")
        if (user.userName) {
            if (!Utils.checkUsername(user.userName)) throw new Error("Username is not true format")
            else await this.userRepo.findByUserName(user.userName)
                .then(data => {
                    if (data) throw new Error("User is existed!!")
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.emailUser) {
            if (!Utils.isEmailAddress(user.emailUser)) throw new Error("Email is not true format")
            else await this.userRepo.findByEmail(user.emailUser)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.telUser) {
            if (!Utils.isPhoneNumber(user.telUser)) throw new Error("Phone is not true format")
            else await this.userRepo.findByPhone(user.telUser)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.password && Utils.checkPassword(user.password)) {
            user.password = MyUtil.getHashPass(user.password);
        } else throw new Error("Password is not true format")

        var result = null;
        await this.userRepo.create(user)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        console.log(result);

        return result;
    }

    public async delete(id: string): Promise<User> {
        return await this.userRepo.delete(id);
    }

    public async update(token: string, userAccount: User): Promise<User> {
        var user = new User();
        return user;
    }

    public async changePassword(token: string, data: object) {
        var user=null;
        return user;
    }

    public async findByUsername(username: string): Promise<User> {
        return await this.userRepo.findByUserName(username);
    }

    public async findByEmail(email: string): Promise<User> {
        return await this.userRepo.findByEmail(email);
    }

    public async findByPhone(phone: any): Promise<User> {
        return await this.userRepo.findByPhone(phone);
    }

    public async login(username: string, password: string): Promise<User> {

        if (!username || !password) throw new Error("Data is not enough!");

        let user = new User();
        await this.userRepo.findByUserName(username)
            .then(data => user = data)
            .catch(err => console.log(err))
        console.log("user: ", user);
        if (!user) throw new Error("UserName is not true!")

        let checkPassword = MyUtil.checkPass(password, user.password);
        console.log("checkPassword", checkPassword)
        if (!checkPassword) throw new Error("Password is not true!");
        return user
    }

    public async logout(token: string): Promise<User> {
        var user = null;
        return user;
    }
}