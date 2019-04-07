import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("user",{schema:"gia_su_thong_minh"})
export class user {

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"emailUser"
        })
    emailUser:string;
        

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idUser"
        })
    idUser:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:225,
        name:"password"
        })
    password:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"telUser"
        })
    telUser:string;
        

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
        name:"userName"
        })
    userName:string;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"userUpdate"
        })
    userUpdate:Date | null;
        
}
