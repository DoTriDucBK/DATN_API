import { class_tutor as ClassTutor } from '../entities/class_tutor';
import { Request, Response, NextFunction } from 'express'
import ClassTutorRepository from '../respository/ClassTutorRepository';
import ClassInfoRepository from '../respository/ClassInfoRepository';
import UserRepository from '../respository/UserRepository';
import TutorRepository from '../respository/TutorRepository';
import { MyUtil } from "../utils/MyUtils";

export default class ClassTutorController {
    private classTutorRepo: ClassTutorRepository;
    private classInfoRepo: ClassInfoRepository;
    private userRepo:UserRepository;
    private tutorRepo: TutorRepository;
    constructor() {
        this.classTutorRepo = new ClassTutorRepository();
        this.classInfoRepo = new ClassInfoRepository();
        this.tutorRepo = new TutorRepository();
        this.userRepo = new UserRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all class ==> GET");
        await this.classTutorRepo.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };
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
    getClassByIdTutor = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Class  by subject==> GET");
        let idTutor = req.query.idTutor;

        await this.classTutorRepo.findByIdTutor(idTutor)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    searchNotification = async (req: Request, res: Response, next: NextFunction) => {
        let options = req.query;
        await this.classTutorRepo.findNotification(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err => MyUtil.handleError(err,res))
    };
    getClassInfoAndTutorByIdTutor = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Lấy thông tin 2 bảng");
        let options = req.query;
        var classTutors = await this.classTutorRepo.findNotification(options);
        var resulf = []
        if (classTutors) {
            for (let i = 0; i < classTutors.length; i++) {
                var classTutor = classTutors[i];
                var classInfo = await this.classInfoRepo.findByIdClass(classTutor["idClass"]);
                var tutor = await this.tutorRepo.findById(classTutor["idTutor"]);     
                var detail = Object.assign(classTutor, { classInfo: classInfo, tutor: tutor });
                resulf.push(detail)
            }
            MyUtil.handleSuccess(resulf, res)
        }else{
            MyUtil.handleError({message: "Lỗi"}, res)
        }
    };
    editClassTutor = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editClassTutor ==> PUT");

        var classTutor: ClassTutor = new ClassTutor();
        var id = req.body.idClass_Tutor;

        classTutor = req.body;

        await this.classTutorRepo.update(id, classTutor).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };
}