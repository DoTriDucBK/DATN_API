import { payment as Payment } from '../entities/payment';
import { Request, Response, NextFunction } from 'express'
import PaymentRepository from '../respository/PaymentRepository';
import { MyUtil } from "../utils/MyUtils";
import { Http2ServerResponse } from 'http2';

export default class PaymentController {
    private paymentRepo: PaymentRepository;
    constructor() {
        this.paymentRepo = new PaymentRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all class ==> GET");
        await this.paymentRepo.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };
    createPayment = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received create payment ==> POST");

        let payment: Payment = new Payment();
        payment = req.body;

        await this.paymentRepo.create(payment)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    getPaymentByIdUser = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get payment  by id==> GET");
        let idUser = req.query.idUser;

        await this.paymentRepo.findByIdUser(idUser)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };
    editPayment = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received edit payment ==> PUT");

        var payment: Payment = new Payment();
        var id = req.body.idPayment;

        payment = req.body;

        await this.paymentRepo.update(id, payment).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };
}