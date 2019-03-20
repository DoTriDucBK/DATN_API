import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("user",{schema:"gia_su_thong_minh"})
export class user {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        length:10,
        name:"idUser"
        })
    idUser:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"telUser"
        })
    telUser:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"emailUser"
        })
    emailUser:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"userName"
        })
    userName:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"password"
        })
    password:string;
        
}
