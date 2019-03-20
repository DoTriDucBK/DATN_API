import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("tutor_login",{schema:"gia_su_thong_minh"})
export class tutor_login {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        length:45,
        name:"idTutorLogin"
        })
    idTutorLogin:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"userNameTutor"
        })
    userNameTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"emailUserTutor"
        })
    emailUserTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"telUserTutor"
        })
    telUserTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"passwordTutor"
        })
    passwordTutor:string;
        
}
