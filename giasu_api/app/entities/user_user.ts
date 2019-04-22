import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("user_user",{schema:"gia_su_thong_minh"})
export class user_user {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idUserUser"
        })
    idUserUser:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idUser"
        })
    idUser:number;
        

    @Column("int",{ 
        nullable:true,
        name:"idUserOfClass"
        })
    idUserOfClass:number | null;
        

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
        

    @Column("int",{ 
        nullable:false,
        name:"idClass"
        })
    idClass:number;
        
}
