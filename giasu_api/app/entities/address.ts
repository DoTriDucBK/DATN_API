import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("address",{schema:"gia_su_thong_minh"})
export class address {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idAddress"
        })
    idAddress:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idCity"
        })
    idCity:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameAddress"
        })
    nameAddress:string;
        
}
