import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("classinfo",{schema:"gia_su_thong_minh"})
export class classinfo {

    @Column("varchar",{ 
        nullable:false,
        length:225,
        name:"address"
        })
    address:string;
        

    @Column("longtext",{ 
        nullable:true,
        name:"description"
        })
    description:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:300,
        name:"detailClass"
        })
    detailClass:string | null;
        

    @Column("int",{ 
        nullable:false,
        name:"fee"
        })
    fee:number;
        

    @Column("int",{ 
        nullable:true,
        name:"idAddress"
        })
    idAddress:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"idCity"
        })
    idCity:number | null;
        

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idClass"
        })
    idClass:number;
        

    @Column("int",{ 
        nullable:true,
        name:"idGrade"
        })
    idGrade:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"idMethod"
        })
    idMethod:number | null;
        

    @Column("int",{ 
        nullable:false,
        name:"idPartHour"
        })
    idPartHour:number;
        

    @Column("int",{ 
        nullable:true,
        name:"idSubject"
        })
    idSubject:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"idUser"
        })
    idUser:number | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameCity"
        })
    nameCity:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameGrade"
        })
    nameGrade:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameSubject"
        })
    nameSubject:string;
        

    @Column("int",{ 
        nullable:false,
        name:"numberDay"
        })
    numberDay:number;
        

    @Column("int",{ 
        nullable:true,
        name:"numberStudent"
        })
    numberStudent:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"shareClass"
        })
    shareClass:string | null;
        

    @Column("tinyint",{ 
        nullable:false,
        name:"status"
        })
    status:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"typeMethod"
        })
    typeMethod:string;
        
}
