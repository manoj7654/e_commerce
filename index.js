const express=require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const app=express();

require("dotenv").config()

app.use(express.json());

app.use("/users",userRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Getting error while connecting to database")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})