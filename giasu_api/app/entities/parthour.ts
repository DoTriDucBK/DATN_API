import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("parthour",{schema:"gia_su_thong_minh"})
export class parthour {

    @Column("time",{ 
        nullable:false,
        name:"beginHour"
        })
    beginHour:string;
        

    @Column("time",{ 
        nullable:false,
        name:"endHour"
        })
    endHour:string;
        

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idPartHour"
        })
    idPartHour:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"namePartHour"
        })
    namePartHour:string;
        

    @Column("float",{ 
        nullable:true,
        name:"valueHour"
        })
    valueHour:number | null;
        
}
