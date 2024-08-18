import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Detail = db.define('details',{
    data:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default Detail;