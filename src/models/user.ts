import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING(),
    field: "first_name",
  })
  firstName: string;

  @Column({
    type: DataType.STRING(),
    field: "last_name",
  })
  lastName: string;

  @Column({
    type: DataType.STRING(),
    unique: true,
    allowNull: true,
  })
  email: string;
}
