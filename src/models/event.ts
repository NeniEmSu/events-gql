import { Model, Optional } from "sequelize";

interface EventAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  capacity?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface EventInput extends Optional<EventAttributes, "id"> {}

export interface EventOutput extends Required<EventAttributes> {}

module.exports = (
  sequelize: any,
  DataTypes: {
    STRING: any;
    TEXT: any;
    INTEGER: any;
    ENUM: (arg0: string, arg1: string) => any;
  }
) => {
  class Event
    extends Model<EventAttributes, EventInput>
    implements EventAttributes
  {
    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public capacity!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }

  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize: sequelize,
      modelName: "Event",
      paranoid: true,
      timestamps: true
    }
  );
  return Event;
};
