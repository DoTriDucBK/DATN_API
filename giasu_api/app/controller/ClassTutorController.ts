import { class_tutor as ClassTutor } from '../entities/class_tutor';
import { Request, Response, NextFunction } from 'express'
import ClassTutorRepository from '../respository/ClassTutorRepository';
import { MyUtil } from "../utils/MyUtils";

export default class ClassTutorController {
    private classTutorRepo: ClassTutorRepository;
    constructor() {
        this.classTutorRepo = new ClassTutorRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all class ==> GET");
        await this.classTutorRepo.getAll().then((result) =>
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
    createClassTutor = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received createClassInfo ==> POST");

        let classTutor: ClassTutor = new ClassTutor();
        classTutor = req.body;

        await this.classTutorRepo.create(classTutor)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getClassByIdUser = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by subject==> GET");
        let idUser = req.query.idUser;

        await this.classTutorRepo.findByIdUser(idUser)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
}