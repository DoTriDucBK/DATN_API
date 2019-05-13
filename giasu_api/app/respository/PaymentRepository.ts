import {payment as Payment} from '../entities/payment';
import{Repository, getConnectionManager, getConnection, getRepository} from 'typeorm';

export default class PaymentRepository {
    private paymentRepo: Repository<Payment>;
    constructor(){
        this.paymentRepo = getRepository(Payment);
    }
    public async getAll(){
        return await this.paymentRepo.find();
    }
    public async update(id, payment){
        return await this.paymentRepo.update(id, payment);
    }
    
    public async create(payment: Payment){
        return await this.paymentRepo.save(payment); 
    }
    public async findByIdUser (id: number){
        return await this.paymentRepo.find({"idUser": id})
    }
}