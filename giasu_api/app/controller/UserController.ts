import { user as User } from "../entities/user";
import { Request, Response, NextFunction } from "express";
import IUserAccountService from "../service/IUserAccountService";
import UserAccountServiceImpl from "../service/UserAccountServiceImp";
import { MyUtil } from "../utils/MyUtils";
import UserRepository from "../respository/UserRepository";

export default class UserController {
    private userAccountService: IUserAccountService;
    private  userRepo :UserRepository;

    constructor() {
        this.userAccountService = new UserAccountServiceImpl();
        this.userRepo = new UserRepository();
    }

    public getAll = async (req: Request, res: Response) => {
        console.log("Received getAllUserAccounts ==> GET");

        await this.userAccountService.getAll()
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };

    public getOne = async (req: Request, res: Response) => {
        console.log("Received user by id ==> GET");
        console.log(req.params);
        var idUser = req.params.idUser;
        if (!idUser) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);
        await this.userAccountService.getOne(idUser)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };
    getUserByIdUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get user  by idUser==> GET");
        let id = req.query.idUser;

        await this.userRepo.findByIdUser(id)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getUserByName = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get user  by idUser==> GET");
        let name = req.query.userName;

        await this.userRepo.getUserByName(name)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    public getUserByToken = async (req: Request, res: Response) => {
        console.log("get user account by token ==> GET")
        var token = req.headers.authorization;

        await this.userAccountService.getUserByToken(token)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    }

    public putLogin = async (req: Request, res: Response) => {
        console.log("login user by email/phone and password => PUT")
        console.log(req.body)
        if (!req.body || req.body == {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        let email = req.body.emailUser;
        let password = req.body.password;
        let type = req.body.type;

        if (!email || !password || !type) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.userAccountService.login(email, password,type)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSignup = async (req: Request, res: Response) => {
        console.log("create a new user ==> POST");
        console.log("req.body: ", req.body);
        if (!req.body || req.body === {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        if ((!req.body.userName)||(!req.body.emailUser)|| (!req.body.telUser) || (!req.body.password)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        let user = new User();
        user = req.body;
        console.log("user: ", user);
        await this.userAccountService.register(user)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public putLogout = async (req: Request, res: Response) => {
        console.log("Logout user ==> PUT")
        var token = req.headers.authorization;
        console.log(token)
        if (!token) MyUtil.handleError({ message: "Token is invalid" }, res);
        await this.userAccountService.logout(token)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
            console.log("DDZ");
            
    }

    public putUpdateUser = async (req: Request, res: Response) => {
        console.log("update user ==> PUT")
        console.log("request data: ", req.body);
        var token = req.headers.authorization;
        var user = new User();
        user = req.body
        if (!user || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        await this.userAccountService.update(token, user)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public updateTokenFirebase = async (req: Request, res: Response) => {
        console.log("update  token firebase user ==> PUT")
        
        var tokenFirebase = req.body.tokenFirebase;
        var id = req.body.idUser;
        if (!tokenFirebase) MyUtil.handleError({ message: "Lối" }, res);

        await this.userRepo.updateTokenFirebase(id, tokenFirebase)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public putChangePassword = async (req: Request, res: Response) => {
        console.log("change password ==> PUT")
        console.log("request data: ", req.body)
        var token = req.headers.authorization;
        if (!req.body || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.userAccountService.changePassword(token, req.body)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))

    }
    editUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editClassUser ==> PUT");

        var user: User = new User();
        var id = req.body.idUser;

        user = req.body;

        await this.userRepo.update(id, user).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };
    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received delete user ==> PUT");
        var id = req.body.idUser;

        await this.userRepo.delete(id).then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));

    };
    searchUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get list user search ==> GET");
        let options = req.query;
        await this.userRepo.findUser(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err => MyUtil.handleError(err,res))
    };
}
