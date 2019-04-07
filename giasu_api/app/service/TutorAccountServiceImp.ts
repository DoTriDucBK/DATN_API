import ITutorAccountService from "./ITutorAccountService";
import TutorLoginRespository from "../respository/TutorLoginRespository";
import { tutor_login as TutorLogin } from "../entities/tutor_login";
import { MyUtil } from "../utils/MyUtils";
import { Utils } from "../utils/Validate";


export default class TutorAccountService implements ITutorAccountService {

    private tutorLoginRepo: TutorLoginRespository;

    constructor() {
        this.tutorLoginRepo = new TutorLoginRespository();
    }

    public async getAll(): Promise<Array<TutorLogin>> {
        return await this.tutorLoginRepo.getAll();
    }

    public async getOne(id: number): Promise<TutorLogin> {
        if (!id) throw new Error("User's id is not true!")
        return await this.tutorLoginRepo.getOne(id);
    }

    public async getUserByToken(token: string): Promise<TutorLogin> {
        if (!token) throw new Error("Token is invalid!");
        var tutorLogin = new TutorLogin();
        await this.tutorLoginRepo.findByToken(token)
            .then(data => tutorLogin = data)
            .catch(err => console.log(err))
        if (!tutorLogin) throw new Error("Token is not existed!");
        var id = MyUtil.getUserIdByToken(token);
        if (id <= 0 || (!id) || (tutorLogin.idTutorLogin !== id)) throw new Error("Token is not true!")
        return tutorLogin;
    }

    public async register(tutorLogin: TutorLogin): Promise<TutorLogin> {
        console.log("//////////////", tutorLogin)
        if (!tutorLogin) throw new Error("User is not null!")
        if (tutorLogin.userNameTutor) {
            if (!Utils.checkUsername(tutorLogin.userNameTutor)) throw new Error("Username is not true format")
            else await this.tutorLoginRepo.findByUserName(tutorLogin.userNameTutor)
                .then(data => {
                    if (data) throw new Error("User is existed!!")
                })
                .catch(err => { throw new Error(err) })
        }

        if (tutorLogin.emailUserTutor) {
            if (!Utils.isEmailAddress(tutorLogin.emailUserTutor)) throw new Error("Email is not true format")
            else await this.tutorLoginRepo.findByEmail(tutorLogin.emailUserTutor)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (tutorLogin.telUserTutor) {
            if (!Utils.isPhoneNumber(tutorLogin.telUserTutor)) throw new Error("Phone is not true format")
            else await this.tutorLoginRepo.findByPhone(tutorLogin.telUserTutor)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (tutorLogin.passwordTutor && Utils.checkPassword(tutorLogin.passwordTutor)) {
            tutorLogin.passwordTutor = MyUtil.getHashPass(tutorLogin.passwordTutor);
        } else throw new Error("Password is not true format")

        // if ((!user.userName) && user.telUser) user.userName = user.telUser;
        // else if ((!user.userName) && (!user.user_account_phone) && user.user_account_email) user.user_account_name = user.user_account_email;

        tutorLogin.userCreate = new Date();

        var result = null;
        await this.tutorLoginRepo.create(tutorLogin)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        console.log(result);
        if (!result) throw new Error("Error creating a new user")

        result.token = MyUtil.getToken(result);
        await this.tutorLoginRepo.update(result.idUser, result)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        return result;
    }

    public async delete(id: number): Promise<TutorLogin> {
        return await this.tutorLoginRepo.delete(id);
    }

    public async update(token: string, tutorLoginAccount: TutorLogin): Promise<TutorLogin> {
        var tutorLogin = new TutorLogin();
        if (!token) throw new Error("Token is invalid!!");

        await this.tutorLoginRepo.findByToken(token)
            .then(data => tutorLogin = data)
            .catch(err => console.log(err))
        if (!tutorLogin) throw new Error("Token is not true");

        var id = MyUtil.getUserIdByToken(token);
        if ((!id) || (id <= 0) || (tutorLogin.idTutorLogin !== id)) throw new Error("Token is not true!");

        tutorLoginAccount.idTutorLogin = id;
        var check = false;
        var isPhone = false;

        // if (user.user_account_name === user.user_account_phone) isPhone = true;
        // if (user.user_account_name === user.user_account_email) isPhone = false;

        if (tutorLoginAccount.userNameTutor) {
            let user1 = new TutorLogin();
            await this.tutorLoginRepo.findByUserName(tutorLoginAccount.userNameTutor)
                .then(data => user1 = data)
                .catch(err => console.log(err))
            if (!user1) check = check && true;
            else {
                if (user1.userNameTutor === tutorLogin.userNameTutor) check = check && true;
                else throw new Error("username is existed!!")
            }
            // if ( userAccount.userName) userAccount.userName = userAccount.user_account_phone;
        }

        // if (userAccount.user_account_email) {
        //     if (!Utils.isEmailAddress(userAccount.user_account_email)) throw new Error("Email is not format!");
        //     let user1 = new UserAccount();
        //     await this.userRepo.findByEmail(userAccount.user_account_email)
        //         .then(data => user1 = data)
        //         .catch(err => console.log(err))
        //     if (!user1) check = check && true;
        //     else {
        //         if (user1.user_account_email === user.user_account_email) check = check && true;
        //         else throw new Error("Email is existed!!")
        //     }
        //     if (!isPhone && (!userAccount.user_account_phone)) userAccount.user_account_name = userAccount.user_account_email;
        // }

        if (tutorLoginAccount.passwordTutor) {
            if (!Utils.checkPassword(tutorLoginAccount.passwordTutor)) throw new Error("Password is not true format");
            tutorLoginAccount.passwordTutor = MyUtil.getHashPass(tutorLoginAccount.passwordTutor);
        }
        tutorLoginAccount.token = MyUtil.getTokenTutor(tutorLoginAccount)
        tutorLoginAccount.userUpdate = new Date();
        console.log("user account: ", tutorLoginAccount);
        return await this.tutorLoginRepo.update(id, tutorLoginAccount);
    }

    public async changePassword(token: string, data: object) {
        // if ((!token) || (!data) || (!data["old_pass"]) || (!data["new_pass"])) throw new Error("Bạn chưa nhập đủ thông tin!");
        var tutorLogin = new TutorLogin();
        return tutorLogin;

        // await this.userRepo.findByToken(token)
        //     .then(data => user = data)
        //     .catch(err => console.log(err))
        // if (!user) throw new Error("Token is not existed!");

        // var user_acc_id = MyUtil.getUserIdByToken(token);
        // if (!user_acc_id || (user_acc_id <= 0) || (user.user_account_id !== user_acc_id)) throw new Error("Token is not true!");

        // if (!MyUtil.checkPass(data["old_pass"], user.user_account_password)) throw new Error("Mật khẩu không đúng!")

        // if (Utils.checkPassword(data["new_pass"])) {
        //     user.user_account_password = MyUtil.getHashPass(data["new_pass"]);
        // } else throw new Error("Password is not true format")

        // user.user_account_token = MyUtil.getToken(user);
        // user.user_account_update = new Date();
        // var result = null;
        // await this.userRepo.update(user.user_account_id, user)
        //     .then(data => result = data)
        //     .catch(err => console.log(err))
        // if (result) return result
        // else throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!")
    }

    public async findByUsername(username: string): Promise<TutorLogin> {
        return await this.tutorLoginRepo.findByUserName(username);
    }

    public async findByEmail(email: string): Promise<TutorLogin> {
        return await this.tutorLoginRepo.findByEmail(email);
    }

    public async findByPhone(phone: any): Promise<TutorLogin> {
        return await this.tutorLoginRepo.findByPhone(phone);
    }

    public async login(username: string, password: string): Promise<TutorLogin> {

        if (!username || !password) throw new Error("Data is not enough!");

            let tutorLogin = new TutorLogin();
            await this.tutorLoginRepo.findByUserName(username)
                .then(data => tutorLogin = data)
                .catch(err => console.log(err))
           
            console.log("user: ", tutorLogin);
            if (!tutorLogin) throw new Error("Username is not true!")

            let checkPassword = MyUtil.checkPass(password, tutorLogin.passwordTutor);
            console.log("checkPassword", checkPassword)
            if (!checkPassword) throw new Error("Password is not true!");

            tutorLogin.token = MyUtil.getTokenTutor(tutorLogin);
            tutorLogin.userLastLogin = new Date();
            tutorLogin.userUpdate = new Date();
            await this.tutorLoginRepo.update(tutorLogin.idTutorLogin, tutorLogin)
                .then(data => tutorLogin = data)
                .catch(err => { throw new Error(err) })
            return tutorLogin
    }

    public async logout(token: string): Promise<TutorLogin> {
        var tutorLogin = new TutorLogin();
        if (!token) throw new Error("Token is invalid!!");

        await this.tutorLoginRepo.findByToken(token)
            .then(data => tutorLogin = data)
            .catch(err => console.log(err))
        if (!tutorLogin) throw new Error("Token is not existed");

        var id = MyUtil.getUserIdByToken(token);
        if (!id || (id <= 0) || (tutorLogin.idTutorLogin !== id)) throw new Error("Token is not true!");
        tutorLogin.token = MyUtil.getTokenTutor(tutorLogin);
            tutorLogin.userLastLogin = new Date();
            tutorLogin.userUpdate = new Date();
            await this.tutorLoginRepo.update(tutorLogin.idTutorLogin, tutorLogin)
                .then(data => tutorLogin = data)
                .catch(err => { throw new Error(err) })
            return tutorLogin
    }
}