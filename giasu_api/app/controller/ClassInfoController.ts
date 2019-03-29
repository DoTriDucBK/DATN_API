import { classinfo as ClassInfo } from '../entities/classinfo';
import { Request, Response, NextFunction } from 'express'
import ClassInfoRepository from '../respository/ClassInfoRepository';
import { MyUtil } from "../utils/MyUtils";

export default class ClassInfoController {
    private classInfoRepo: ClassInfoRepository;
    constructor() {
        this.classInfoRepo = new ClassInfoRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all class ==> GET");
        await this.classInfoRepo.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };
    getClassBySubject = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by subject==> GET");
        let nameSubject = req.query.nameSubject;

        await this.classInfoRepo.findBySubject(nameSubject)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    searchClass = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received search Class ==> GET");
        let options = req.query;
        await this.classInfoRepo.searchClass(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err=> MyUtil.handleError(err,res))
    };
    createClassInfo = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received createClassInfo ==> POST");

        let classInfo: ClassInfo = new ClassInfo();
        classInfo = req.body;

        await this.classInfoRepo.create(classInfo)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getClassByIdUser = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by subject==> GET");
        let idUser = req.query.idUser;

        await this.classInfoRepo.findByIdUser(idUser)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
}