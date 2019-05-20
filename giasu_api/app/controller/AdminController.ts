import { admin as Admin } from "../entities/admin";
import { Request, Response, NextFunction } from "express";
import IAdminAccountService from "../service/IAdminAccountService";
import AdminAccountServiceImpl from "../service/AdminAccountServiceImp";
import { MyUtil } from "../utils/MyUtils";
import AdminRepository from "../respository/AdminRespository";

export default class AdminController {
    private adminAccountService: IAdminAccountService;
    private  adminRepo :AdminRepository;

    constructor() {
        this.adminAccountService = new AdminAccountServiceImpl();
        this.adminRepo = new AdminRepository();
    }

    public getAll = async (req: Request, res: Response) => {
        console.log("Received getAllUserAccounts ==> GET");

        await this.adminAccountService.getAll()
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };

    public getOne = async (req: Request, res: Response) => {
        var idAdmin = req.params.idAdmin;
        if (!idAdmin) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);
        await this.adminAccountService.getOne(idAdmin)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    };
    getAdminByIdAdmin = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get user  by idAdmin==> GET");
        let id = req.query.idAdmin;

        await this.adminRepo.findByIdAdmin(id)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getAdminByName = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get user  by idUser==> GET");
        let name = req.query.nameAdmin;

        await this.adminRepo.getAdminByName(name)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    public getAdminByToken = async (req: Request, res: Response) => {
        console.log("get user account by token ==> GET")
        var token = req.headers.authorization;

        await this.adminAccountService.getAdminByToken(token)
            .then((data) => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res));
    }

    public putLogin = async (req: Request, res: Response) => {
        console.log("login user by email/phone and password => PUT")
        console.log(req.body)
        if (!req.body || req.body == {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        let email = req.body.emailAdmin;
        let password = req.body.password;

        if (!email || !password) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        await this.adminAccountService.login(email, password)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSignup = async (req: Request, res: Response) => {
        console.log("create a new user ==> POST");
        console.log("req.body: ", req.body);
        if (!req.body || req.body === {}) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);

        if ((!req.body.nameAdmin)||(!req.body.emailAdmin)|| (!req.body.telAdmin) || (!req.body.password)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        let admin = new Admin();
        admin = req.body;
        console.log("admin: ", admin);
        await this.adminAccountService.register(admin)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public putLogout = async (req: Request, res: Response) => {
        console.log("Logout user ==> PUT")
        var token = req.headers.authorization;
        console.log(token)
        if (!token) MyUtil.handleError({ message: "Token is invalid" }, res);
        await this.adminAccountService.logout(token)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
            console.log("DDZ");
            
    }

    public putUpdateAdmin = async (req: Request, res: Response) => {
        console.log("update admin ==> PUT")
        console.log("request data: ", req.body);
        var token = req.headers.authorization;
        var admin = new Admin();
        admin = req.body
        if (!admin || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin" }, res);

        await this.adminAccountService.update(token, admin)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }


    public putChangePassword = async (req: Request, res: Response) => {
        console.log("change password ==> PUT")
        console.log("request data: ", req.body)
        var token = req.headers.authorization;
        if (!req.body || (!token)) MyUtil.handleError({ message: "Bạn chưa nhập đủ thông tin!" }, res);
        
        await this.adminAccountService.changePassword(token, req.body)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))

    };
    editAdmin = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editAdmin ==> PUT");

        var admin: Admin = new Admin();
        var id = req.body.idAdmin;

        admin = req.body;

        await this.adminRepo.update(id, admin).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };
}
