import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("teachingmethod",{schema:"gia_su_thong_minh"})
export class teachingmethod {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idTeachingMethod"
        })
    idTeachingMethod:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameMethod"
        })
    nameMethod:string;
        
}
