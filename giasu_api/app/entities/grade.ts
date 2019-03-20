import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("grade",{schema:"gia_su_thong_minh"})
export class grade {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idGrade"
        })
    idGrade:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameGrade"
        })
    nameGrade:string;
        
}
