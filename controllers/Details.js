import Detail from "../models/detailsModel.js";
import dotenv from 'dotenv';

dotenv.config()

export const insertDetails = async (req,res) => {
    try{
        
        const data = JSON.stringify(req.body.data)        
        const insertedData = await Detail.create({data: data})
        res.json({message: "Details saved!"})
    }catch(error){
        console.error(error);
        res.json(400,{message: "Something went wrong!"})
    }
}