import { user as User } from "../entities/user";
import { Request, Response, NextFunction } from "express";
import IUserAccountService from "../service/IUserAccountService";
import UserAccountServiceImpl from "../service/UserAccountServiceImp";
import { MyUtil } from "../utils/MyUtils";

export default class UserController {
    private userAccountService: IUserAccountService;

    constructor() {
        this.userAccountService = new UserAccountServiceImpl()
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

        let username = req.body.userName;
        let password = req.body.password;

        if (!username || !password) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.userAccountService.login(username, password)
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
        if (!token) MyUtil.handleError({ message: "Token is invalid" }, res);
        await this.userAccountService.logout(token)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
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

    public putChangePassword = async (req: Request, res: Response) => {
        console.log("change password ==> PUT")
        console.log("request data: ", req.body)
        var token = req.headers.authorization;
        if (!req.body || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);
        
        await this.userAccountService.changePassword(token, req.body)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))

    }

}
