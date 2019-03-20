import {subject as Subject} from '../entities/subject'
import{Request, Response, NextFunction} from 'express'
import SubjectRepository from '../respository/SubjectRepository';

export default class SubjectController{
    private subjectRepo: SubjectRepository;

    constructor(){
        this.subjectRepo = new SubjectRepository()
    }

    public getAll= async(req: Request, res: Response, next: NextFunction)=>{
        await this.subjectRepo.getAll().catch((err)=> res.send({err:"Lỗi"})).then((resulf)=>
            res.send({"code": "suscess", "data": resulf})

        )

    }
    getSubjectById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Subject by id==> GET");
        // let id = req.query.idSubject;

        await this.subjectRepo.getOne(1).catch((err) => res.send({err:"Lỗi"})).then((resulf) =>
            res.send({"code":"success","data":resulf})
        )
    }
    getSubjectByName = async (req: Request, res: Response, next: NextFunction) =>{
        console.log("Received get Subject by name ==> GET");
        await this.subjectRepo.findByName("Toán").catch((err) => res.send({err:"lỗi"})).then((resulf) =>
            res.send({"code":"success","data":resulf})
        )
    }
}