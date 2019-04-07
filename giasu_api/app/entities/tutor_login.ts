import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("tutor_login",{schema:"gia_su_thong_minh"})
export class tutor_login {

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"emailUserTutor"
        })
    emailUserTutor:string;
        

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idTutorLogin"
        })
    idTutorLogin:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:225,
        name:"passwordTutor"
        })
    passwordTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"telUserTutor"
        })
    telUserTutor:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:225,
        name:"token"
        })
    token:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"userCreate"
        })
    userCreate:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"userLastLogin"
        })
    userLastLogin:Date | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"userNameTutor"
        })
    userNameTutor:string;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"userUpdate"
        })
    userUpdate:Date | null;
        
}
