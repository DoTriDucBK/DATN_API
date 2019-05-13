import { class_user as ClassUser } from '../entities/class_user';
import { Request, Response, NextFunction } from 'express'
import ClassUserRepository from '../respository/ClassUserRepository';
import TutorRepository from '../respository/TutorRepository';
import ClassInfoRepository from '../respository/ClassInfoRepository';
import UserAPI from '../respository/UserRepository';
import { MyUtil } from "../utils/MyUtils";
import { classinfo as ClassInfo } from '../entities/classinfo';
import { tutor as Tutor } from '../entities/tutor';
import UserRepository from '../respository/UserRepository';

export default class ClassUserController {
    private classUserRepo: ClassUserRepository;
    private classInfoRepo: ClassInfoRepository;
    private userRepo:UserRepository;
    private tutorRepo: TutorRepository;
    constructor() {
        this.classUserRepo = new ClassUserRepository();
        this.classInfoRepo = new ClassInfoRepository();
        this.tutorRepo = new TutorRepository();
        this.userRepo = new UserRepository();
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
    getClassByIdClass = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by idClass ==> GET");
        let idClass = req.query.idClass;

        await this.classUserRepo.findByIdClass(idClass)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    searchClassUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get list Tutor search ==> GET");
        let options = req.query;
        await this.classUserRepo.findNotification(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err => MyUtil.handleError(err,res))
    };
    editClassUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editClassUser ==> PUT");

        var classUser: ClassUser = new ClassUser();
        var id = req.body.idClass_User;

        classUser = req.body;

        await this.classUserRepo.update(id, classUser).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };
    getClassInfoAndTutor = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Lấy thông tin 2 bảng");

        let idUser = req.query.idUser;

        var classUsers = await this.classUserRepo.findByIdUser(idUser);
        var resulf = []
        if (classUsers) {
            for (let i = 0; i < classUsers.length; i++) {
                var classUser = classUsers[i];
                var classInfo = await this.classInfoRepo.findByIdClass(classUser["idClass"]);
                var tutor = await this.tutorRepo.findById(classUser["idTutor"]);
                
                var detail = Object.assign(classUser, { classInfo: classInfo, tutor: tutor });
                resulf.push(detail)

            }
            MyUtil.handleSuccess(resulf, res)
        }else{
            MyUtil.handleError({message: "Lỗi"}, res)
        }

    }
    getClassInfoAndTutorByIdTutor = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Lấy thông tin 2 bảng");
        let status = req.query.status;
        var classUsers = await this.classUserRepo.findClassByStatus(status);
        var resulf = []
        if (classUsers) {
            for (let i = 0; i < classUsers.length; i++) {
                var classUser = classUsers[i];
                var classInfo = await this.classInfoRepo.findByIdClass(classUser["idClass"]);
                var user = await this.userRepo.findByIdUser(classUser["idUser"]);
                
                var detail = Object.assign(classUser, { classInfo: classInfo, user: user });
                resulf.push(detail)

            }
            MyUtil.handleSuccess(resulf, res)
        }else{
            MyUtil.handleError({message: "Lỗi"}, res)
        }

    };
    getClassInfoAndTutorByStatusAndId = async (req: Request, res: Response, next: NextFunction) => {
        let options = req.query;
        var classUsers = await this.classUserRepo.findNotification(options);
        var resulf = []
        if (classUsers) {
            for (let i = 0; i < classUsers.length; i++) {
                var classUser = classUsers[i];
                var classInfo = await this.classInfoRepo.findByIdClass(classUser["idClass"]);
                var tutor = await this.tutorRepo.findById(classUser["idTutor"]);
                
                var detail = Object.assign(classUser, { classInfo: classInfo, tutor: tutor });
                resulf.push(detail)

            }
            MyUtil.handleSuccess(resulf, res)
        }else{
            MyUtil.handleError({message: "Lỗi"}, res)
        }

    };
    getClassInfoAndUser = async (req: Request, res: Response, next: NextFunction) => {
        let options = req.query;
        var classUsers = await this.classUserRepo.findNotification(options);
        var resulf = []
        if (classUsers) {
            for (let i = 0; i < classUsers.length; i++) {
                var classUser = classUsers[i];
                var classInfo = await this.classInfoRepo.findByIdClass(classUser["idClass"]);
                var user = await this.userRepo.findByIdUser(classUser["idUser"]);
                
                var detail = Object.assign(classUser, { classInfo: classInfo, user: user });
                resulf.push(detail)

            }
            MyUtil.handleSuccess(resulf, res)
        }else{
            MyUtil.handleError({message: "Lỗi"}, res)
        }

    };
    searchNotification = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get list Tutor search ==> GET");
        let options = req.query;
        await this.classUserRepo.findNotification(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err => MyUtil.handleError(err,res))
    };
}