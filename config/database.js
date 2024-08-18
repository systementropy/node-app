import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
// import fs from 'fs';
dotenv.config()

// const db = new Sequelize(process.env.DB_NAME, `${process.env.DB_USER}@${process.env.DB_HOST}`, process.env.DB_PASSWORD, {host: process.env.DB_HOST, "dialect": "mysql","ssl": true,"dialectOptions": {ssl: {ca: fs.readFileSync('./BaltimoreCyberTrustRoot.crt.pem')}}});
const db = new Sequelize(process.env.DB_BASE, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define:{
        timestamps: false
    }
});

export default db;




// const Sequelize =  require("sequelize");
// const dotenv =  require('dotenv');
// dotenv.config()

// const db3 = new Sequelize(process.env.DB_NAME, `${process.env.DB_USER}@${process.env.DB_HOST}`, process.env.DB_PASSWORD, {host: process.env.DB_HOST, "dialect": "mysql","ssl": true,"dialectOptions": {ssl: {ca: fs.readFileSync('./BaltimoreCyberTrustRoot.crt.pem')}}});