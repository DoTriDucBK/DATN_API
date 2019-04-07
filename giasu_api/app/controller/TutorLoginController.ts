import { tutor_login as TutorLogin } from "../entities/tutor_login";
import { Request, Response, NextFunction } from "express";
import ITutorAccountService from "../service/ITutorAccountService";
import TutorAccountServiceImp from "../service/TutorAccountServiceImp";
import { MyUtil } from "../utils/MyUtils";

export default class TutorLoginController {
    private tutorAccountService: ITutorAccountService;

    constructor() {
        this.tutorAccountService = new TutorAccountServiceImp()
    }

    public getAll = async (req: Request, res: Response) => {
        console.log("Received getAllUserAccounts ==> GET");

        await this.tutorAccountService.getAll()
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };

    public getOne = async (req: Request, res: Response) => {
        console.log("Received user by id ==> GET");
        console.log(req.params);
        var idTutorLogin = req.params.idTutorLogin;
        if (!idTutorLogin) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);
        await this.tutorAccountService.getOne(idTutorLogin)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };

    public getUserByToken = async (req: Request, res: Response) => {
        console.log("get user account by token ==> GET")
        var token = req.headers.authorization;

        await this.tutorAccountService.getUserByToken(token)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    }

    public putLogin = async (req: Request, res: Response) => {
        console.log("login user by email/phone and password => PUT")
        console.log(req.body)
        if (!req.body || req.body == {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        let userNameTutor = req.body.userNameTutor;
        let passwordTutor = req.body.passwordTutor;

        if (!userNameTutor || !passwordTutor) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.tutorAccountService.login(userNameTutor, passwordTutor)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSignup = async (req: Request, res: Response) => {
        console.log("create a new user ==> POST");
        console.log("req.body: ", req.body);
        if (!req.body || req.body === {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        if ((!req.body.userNameTutor)||(!req.body.emailUserTutor)|| (!req.body.telUserTutor) || (!req.body.passwordTutor)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        let tutorLogin = new TutorLogin();
        tutorLogin = req.body;
        console.log("user: ", tutorLogin);
        await this.tutorAccountService.register(tutorLogin)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public putLogout = async (req: Request, res: Response) => {
        console.log("Logout user ==> PUT")
        var token = req.headers.authorization;
        console.log(token)
        if (!token) MyUtil.handleError({ message: "Token is invalid" }, res);
        await this.tutorAccountService.logout(token)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
            console.log("DDZ");
            
    }

    public putUpdateUser = async (req: Request, res: Response) => {
        console.log("update user ==> PUT")
        console.log("request data: ", req.body);
        var token = req.headers.authorization;
        var user = new TutorLogin();
        user = req.body
        if (!user || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        await this.tutorAccountService.update(token, user)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public putChangePassword = async (req: Request, res: Response) => {
        console.log("change password ==> PUT")
        console.log("request data: ", req.body)
        var token = req.headers.authorization;
        if (!req.body || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);
        
        await this.tutorAccountService.changePassword(token, req.body)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))

    }

}
