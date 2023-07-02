import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user";
import { Group } from "./group";
import { Image } from "./image";

@Table({
  tableName: "messages",
  timestamps: true,
  underscored: true,
})
export class Message extends Model {
  @Column({
    type: DataType.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    field: "sender_id",
  })
  senderId: number;

  @BelongsTo(() => User)
  sender: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    field: "receiver_id",
  })
  receiverId: number;

  @BelongsTo(() => User)
  receiver: User;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    field: "group_id",
  })
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  text: string;

  @HasMany(() => Image)
  images: Image[];
}
