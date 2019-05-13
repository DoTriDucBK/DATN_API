import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("payment",{schema:"gia_su_thong_minh"})
export class payment {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idPayment"
        })
    idPayment:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idUser"
        })
    idUser:number;
        

    @Column("int",{ 
        nullable:true,
        name:"numberMoney"
        })
    numberMoney:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"methodPayment"
        })
    methodPayment:string | null;
        
}
