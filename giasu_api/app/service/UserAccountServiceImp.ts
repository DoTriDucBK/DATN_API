import IUserAccountService from "./IUserAccountService";
import UserRepository from "../respository/UserRepository";
import { user as User } from "../entities/user";
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

    public async getOne(id: number): Promise<User> {
        if (!id) throw new Error("User's id is not true!")
        return await this.userRepo.getOne(id);
    }

    public async getUserByToken(token: string): Promise<User> {
        if (!token) throw new Error("Token is invalid!");
        var user = new User();
        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed!");
        var id = MyUtil.getUserIdByToken(token);
        if (id <= 0 || (!id) || (user.idUser !== id)) throw new Error("Token is not true!")
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

    

        user.userCreate = new Date();

        var result = null;
        await this.userRepo.create(user)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        console.log(result);
        if (!result) throw new Error("Error creating a new user")

        result.token = MyUtil.getToken(result);
        await this.userRepo.update(result.idUser, result)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        return result;
    }


    public async delete(id: number): Promise<User> {
        return await this.userRepo.delete(id);
    }

    public async update(token: string, userAccount: User): Promise<User> {
        var user = new User();
        if (!token) throw new Error("Token is invalid!!");

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not true");

        var id = MyUtil.getUserIdByToken(token);
        if ((!id) || (id <= 0) || (user.idUser !== id)) throw new Error("Token is not true!");

        userAccount.idUser = id;
        var check = false;
        var isPhone = false;


        if (userAccount.userName) {
            let user1 = new User();
            await this.userRepo.findByUserName(userAccount.userName)
                .then(data => user1 = data)
                .catch(err => console.log(err))
            if (!user1) check = check && true;
            else {
                if (user1.userName === user.userName) check = check && true;
                else throw new Error("username is existed!!")
            }
        }

        if (userAccount.password) {
            if (!Utils.checkPassword(userAccount.password)) throw new Error("Password is not true format");
            userAccount.password = MyUtil.getHashPass(userAccount.password);
        }
        userAccount.token = MyUtil.getToken(userAccount)
        userAccount.userUpdate = new Date();
        console.log("user account: ", userAccount);
        return await this.userRepo.update(id, userAccount);
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

    public async login(email: string, password: string, type:number): Promise<User> {

        if (!email || !password || !type) throw new Error("Data is not enough!");

            let user = new User();
            await this.userRepo.findByEmail(email)
                .then(data => user = data)
                .catch(err => console.log(err))
           
            console.log("user: ", user);
            if (!user) throw new Error("Email không đúng!")

            let checkPassword = MyUtil.checkPass(password, user.password);
            console.log("checkPassword", checkPassword)
            if (!checkPassword) throw new Error("Password không đúng!");
            let checkType = MyUtil.checkType(type,user.type);
            if(!checkType) throw new Error("Vai trò không đúng");
            let checkActive = MyUtil.checkActive(user.active);
            if(!checkActive) throw new Error("Tài khoản bị vô hiệu hóa!");
            user.token = MyUtil.getToken(user);
            user.userLastLogin = new Date();
            user.userUpdate = new Date();
            await this.userRepo.update(user.idUser, user)
                .then(data => user = data)
                .catch(err => { throw new Error(err) })
            return user
    }

    public async logout(token: string): Promise<User> {
        var user = new User();
        if (!token) throw new Error("Token is invalid!!");

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed");

        var id = MyUtil.getUserIdByToken(token);
        if (!id || (id <= 0) || (user.idUser !== id)) throw new Error("Token is not true!");

        user.token = "";
        user.userUpdate = new Date();
        await this.userRepo.update(user.idUser, user)
            .then(data => user = data)
            .catch(err => { throw new Error(err) })
        return user
    }
    public async changePassword(token: string, data: object): Promise<User> {
        if ((!token) || (!data) || (!data["old_pass"]) || (!data["new_pass"])) throw new Error("Bạn chưa nhập đủ thông tin!");
        var user = new User();

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed!");

        var idUser = MyUtil.getUserIdByToken(token);
        if (!idUser || (idUser <= 0) || (user.idUser !== idUser)) throw new Error("Token is not true!");

        if (!MyUtil.checkPass(data["old_pass"], user.password)) throw new Error("Mật khẩu không đúng!")

        if (Utils.checkPassword(data["new_pass"])) {
            user.password = MyUtil.getHashPass(data["new_pass"]);
        } else throw new Error("Password is not true format")

        user.token = MyUtil.getToken(user);
        user.userUpdate = new Date();
        var newUser = new User();
        await this.userRepo.update(user.idUser, user)
            .then(data => newUser = data)
            .catch(err => { throw new Error(err) })

        return newUser;
    }

}