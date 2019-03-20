import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("fee",{schema:"gia_su_thong_minh"})
export class fee {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idFee"
        })
    idFee:number;
        

    @Column("int",{ 
        nullable:false,
        name:"valueFee"
        })
    valueFee:number;
        
}
