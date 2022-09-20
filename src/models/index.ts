import * as dotenv from "dotenv";
dotenv.config();

import fs from 'fs';
import path from 'path';
import { DataTypes, Dialect, Sequelize } from "sequelize";

const basename = path.basename(__filename);

// const dbName = process.env.DB_DATABASE as string;
// const dbUser = process.env.DB_USER as string;
// const dbHost = process.env.DB_HOST;
// const dbDriver = process.env.DB_DRIVER as Dialect;
// const dbPassword = process.env.DB_PASSWORD;

// const isDev = process.env.NODE_ENV === "development";

const db: any = {};

let sequelize: any;

sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION as Dialect
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database: ', error)
  })


fs.readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model

    sequelize
      .sync(
        { force: true }
      )
      .then(() => {
        console.log(`${model.name.toUpperCase()} table created successfully!`)
      })
      .catch((error: any) => {
        console.error(`Unable to create ${model.name} table : `, error)
      })
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize;
export default db;
