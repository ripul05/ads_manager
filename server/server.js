const express = require("express")

const PORT = 3001
const app = express()
app.get("/api",(req,res)=>{
    res.json({users: ["user1","user2","user3"]})
})

app.listen(PORT,()=>{
    console.log("Server is listening on PORT: ",PORT)
})