import { class_user as ClassUser } from '../entities/class_user';
import { Request, Response, NextFunction } from 'express'
import ClassUserRepository from '../respository/ClassUserRepository';
import { MyUtil } from "../utils/MyUtils";

export default class ClassUserController {
    private classUserRepo: ClassUserRepository;
    constructor() {
        this.classUserRepo = new ClassUserRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all class ==> GET");
        await this.classUserRepo.getAll().then((result) =>
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
    // searchClass = async (req: Request, res: Response, next: NextFunction) => {
    //     console.log("Received search Class ==> GET");
    //     let options = req.query;
    //     await this.classInfoRepo.searchClass(options)
    //         .then(data => MyUtil.handleSuccess(data,res))
    //         .catch(err=> MyUtil.handleError(err,res))
    // };
    createClassUser = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received createClassInfo ==> POST");

        let classUser: ClassUser = new ClassUser();
        classUser = req.body;

        await this.classUserRepo.create(classUser)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getClassByIdUser = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by subject==> GET");
        let idUser = req.query.idUser;

        await this.classUserRepo.findByIdUser(idUser)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
}