import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("tutor",{schema:"gia_su_thong_minh"})
export class tutor {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idTutor"
        })
    idTutor:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameTutor"
        })
    nameTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"emailTutor"
        })
    emailTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"telTutor"
        })
    telTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"jobTutor"
        })
    jobTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"addressTutor"
        })
    addressTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"fee"
        })
    fee:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"birthdayTutor"
        })
    birthdayTutor:string;
        

    @Column("int",{ 
        nullable:false,
        name:"idCity"
        })
    idCity:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameCity"
        })
    nameCity:string;
        

    @Column("int",{ 
        nullable:true,
        name:"idAdress"
        })
    idAdress:number | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:225,
        name:"nameAdress"
        })
    nameAdress:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:225,
        name:"infoTutor"
        })
    infoTutor:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameSubject"
        })
    nameSubject:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:225,
        name:"link_image"
        })
    link_image:string | null;
        
}
