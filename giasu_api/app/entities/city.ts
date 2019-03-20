import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("city",{schema:"gia_su_thong_minh"})
export class city {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idCity"
        })
    idCity:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"nameCity"
        })
    nameCity:string;
        
}
