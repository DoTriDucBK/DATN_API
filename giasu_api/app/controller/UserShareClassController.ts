import { user_user as UserUser } from '../entities/user_user';
import { Request, Response, NextFunction } from 'express'
import UserShareClassRepository from '../respository/UserShareClassRepository';
import ClassInfoRepository from '../respository/ClassInfoRepository';
import { MyUtil } from "../utils/MyUtils";
import { classinfo as ClassInfo } from '../entities/classinfo';
import { tutor as Tutor } from '../entities/tutor';
import UserRepository from '../respository/UserRepository';

export default class UserShareClassController {
    private userShareClassRepo: UserShareClassRepository;
    private classInfoRepo: ClassInfoRepository;
    private userRepo:UserRepository;
    constructor() {
        this.userShareClassRepo = new UserShareClassRepository();
        this.classInfoRepo = new ClassInfoRepository();
        this.userRepo = new UserRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all class ==> GET");
        await this.userShareClassRepo.getAll().then((result) =>
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
    createUserShareClass = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received createShare ==> POST");

        let userShare: UserUser = new UserUser();
        userShare = req.body;

        await this.userShareClassRepo.create(userShare)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getClassByIdUser = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by subject==> GET");
        let idUser = req.query.idUser;

        await this.userShareClassRepo.findByIdUser(idUser)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getClassByIdClass = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by idClass ==> GET");
        let idClass = req.query.idClass;

        await this.userShareClassRepo.findByIdClass(idClass)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    searchClassUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get list Tutor search ==> GET");
        let options = req.query;
        await this.userShareClassRepo.findNotification(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err => MyUtil.handleError(err,res))
    };
    editClassUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editClassUser ==> PUT");

        var classUser: UserUser = new UserUser();
        var id = req.body.idUserUser;

        classUser = req.body;

        await this.userShareClassRepo.update(id, classUser).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };
    getClassInfoAndUserOfClass = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Lấy thông tin 2 bảng");

        let idUser = req.query.idUser;

        var classUsers = await this.userShareClassRepo.findByIdUser(idUser);
        var resulf = []
        if (classUsers) {
            for (let i = 0; i < classUsers.length; i++) {
                var classUser = classUsers[i];
                var classInfo = await this.classInfoRepo.findByIdClass(classUser["idClass"]);
                var user = await this.userRepo.findByIdUser(classUser["idUser"]);
                
                var detail = Object.assign(classUser, { classInfo: classInfo, userOfClass: user });
                resulf.push(detail)

            }
            MyUtil.handleSuccess(resulf, res)
        }else{
            MyUtil.handleError({message: "Lỗi"}, res)
        }

    }
    getClassInfoAndTutorByIdUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Lấy thông tin 2 bảng");
        let options = req.query;
        var classUsers = await this.userShareClassRepo.findNotification(options);
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
        await this.userShareClassRepo.findNotification(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err => MyUtil.handleError(err,res))
    };
}