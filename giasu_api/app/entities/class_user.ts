import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("class_user",{schema:"gia_su_thong_minh"})
export class class_user {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idClass_User"
        })
    idClass_User:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idClass"
        })
    idClass:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idUser"
        })
    idUser:number;
        

    @Column("int",{ 
        nullable:false,
        name:"status"
        })
    status:number;
        

    @Column("int",{ 
        nullable:true,
        name:"idTutor"
        })
    idTutor:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"notification"
        })
    notification:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"is_seen"
        })
    is_seen:number | null;
        
}
