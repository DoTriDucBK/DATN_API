import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("subject",{schema:"gia_su_thong_minh"})
export class subject {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idSubject"
        })
    idSubject:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"nameSubject"
        })
    nameSubject:string | null;
        
}
