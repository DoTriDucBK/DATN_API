import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("class_tutor",{schema:"gia_su_thong_minh"})
export class class_tutor {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idClass_Tutor"
        })
    idClass_Tutor:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idClass"
        })
    idClass:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idTutor"
        })
    idTutor:number;
        

    @Column("int",{ 
        nullable:false,
        name:"status"
        })
    status:number;
        
}
