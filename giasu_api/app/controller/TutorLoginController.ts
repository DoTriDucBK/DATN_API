import {tutor_login as TutorLogin} from '../entities/tutor_login';
import TutorLoginRespository from '../respository/TutorLoginRespository';
import { Request, Response, NextFunction } from 'express';
import { MyUtil } from "../utils/MyUtils";

export default class TutorLoginController {
    private tutorLoginRepo: TutorLoginRespository;
    constructor(){
        this.tutorLoginRepo = new TutorLoginRespository();
    }
    createTutor = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received createAcountTutor ==> POST");

        let tutorLogin: TutorLogin = new TutorLogin();
        tutorLogin = req.body;

        await this.tutorLoginRepo.create(tutorLogin)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
}