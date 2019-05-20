import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("admin",{schema:"gia_su_thong_minh"})
export class admin {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idAdmin"
        })
    idAdmin:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameAdmin"
        })
    nameAdmin:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:225,
        name:"emailAdmin"
        })
    emailAdmin:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"telAdmin"
        })
    telAdmin:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:225,
        name:"password"
        })
    password:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:225,
        name:"token"
        })
    token:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"adminLastLogin"
        })
    adminLastLogin:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"adminCreate"
        })
    adminCreate:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"adminUpdate"
        })
    adminUpdate:Date | null;
        
}
