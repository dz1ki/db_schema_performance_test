import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Message } from "./message";
import { UserGroup } from "./group_user";
import { User } from "./user";

@Table({
  tableName: "groups",
  timestamps: false,
})
export class Group extends Model {
  @Column({
    type: DataType.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(),
    defaultValue: null,
  })
  name: string;

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];

  @HasMany(() => Message, "group_id")
  messages: Message[];
}
