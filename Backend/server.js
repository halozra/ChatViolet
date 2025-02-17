import express from "express"
import mongoose from "mongoose"

const app = express()
const port = 5000;

app.listen(port,(req,res)=>{
    console.log(`Server running at htttp://localhost:${port}`)
})