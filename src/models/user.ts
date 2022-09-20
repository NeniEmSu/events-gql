import { Model, Optional, UUID, UUIDV4 } from "sequelize";

interface UserAttributes {
  id: string;
  email: string;
  scope: string;
  username: string;
  password: string;
  count?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}

export interface UserOutput extends Required<UserAttributes> {}

module.exports = (
  sequelize: any,
  DataTypes: {
    UUID: any;
    STRING: any;
    INTEGER: any;
    ENUM: (arg0: string, arg1: string) => any;
  }
) => {
  class User
    extends Model<UserAttributes, UserInput>
    implements UserAttributes
  {
    public id!: string;
    public username!: string;
    public email!: string;
    public scope!: string;
    public password!: string;
    public count!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  User.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      scope: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
        unique: false,
      },
    },
    {
      sequelize: sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true
    }
  );
  return User;
};
