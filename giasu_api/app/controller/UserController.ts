import { user as User } from '../entities/user';
import { Request, Response, NextFunction } from 'express'
import UserRepository from '../respository/UserRepository';
import { MyUtil } from "../utils/MyUtils";

export default class UserController {
    private userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all user ==> GET");
        await this.userRepo.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };
    // getClassBySubject = async (req: Request, res: Response, next: NextFunction) => {

    //     console.log("Received get Class  by subject==> GET");
    //     let nameSubject = req.query.nameSubject;

    //     await this.classInfoRepo.findBySubject(nameSubject)
    //         .then(data => MyUtil.handleSuccess(data, res))
    //         .catch(err => MyUtil.handleError(err, res))
    // };
    createUser = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received createUser ==> POST");

        let user: User = new User();
        user = req.body;

        await this.userRepo.create(user)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }
}