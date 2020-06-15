import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * 留言实体类
 */
@Entity()
export class tbMessage {
    @Column()
    private Id: number; //id

    @Column()
    private content: string; //内容

    @Column()
    private time: Date;  //创建日期

    @Column()
    private mTitle: string;  //标题

    @Column()
    private category: number; //种类

    @Column()
    private showType: number; //是否显示
}