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
        nullable:true,
        name:"idCity"
        })
    idCity:number | null;
        

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
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"methodTeaching"
        })
    methodTeaching:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:225,
        name:"identification"
        })
    identification:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:225,
        name:"degree_image"
        })
    degree_image:string | null;
        

    @Column("float",{ 
        nullable:true,
        name:"star"
        })
    star:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"times_vote"
        })
    times_vote:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"authentication"
        })
    authentication:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"monday"
        })
    monday:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"tuesday"
        })
    tuesday:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"wednesday"
        })
    wednesday:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"thursday"
        })
    thursday:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"friday"
        })
    friday:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"saturday"
        })
    saturday:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"sunday"
        })
    sunday:string | null;
        
}
