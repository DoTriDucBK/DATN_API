import { tutor as Tutor } from '../entities/tutor';
import { Request, Response, NextFunction } from 'express'
import TutorRepository from '../respository/TutorRepository';
import { MyUtil } from "../utils/MyUtils";


export default class TutorController {
    private tutorRepo: TutorRepository;
    constructor() {
        this.tutorRepo = new TutorRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all tutor ==> GET");
        await this.tutorRepo.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };
    getTutorBySubject = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Tutor by name==> GET");
        let sub = req.query.nameSubject;

        await this.tutorRepo.findBySubject(sub)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getTutorByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Tutor by name==> GET");
        let name = req.query.nameTutor;

        await this.tutorRepo.findByName(name)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };

    getTutorById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Brand vehicle  by name==> GET");
        let id = req.query.idTutor;

        await this.tutorRepo.findById(id)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    createTutor = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received createTutor ==> POST");

        let tutor: Tutor = new Tutor();
        tutor = req.body;

        await this.tutorRepo.create(tutor)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    searchTutor = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get list Tutor search ==> GET");
        let options = req.query;
        await this.tutorRepo.findTutor(options)
            .then(data => MyUtil.handleSuccess(data,res))
            .catch(err => MyUtil.handleError(err,res))
    }
}