import express from "express"
import fs from "fs/promises"


const dir = await fs.readdir(process.cwd())
if (!dir.includes('users.json')) await fs.writeFile('users.json','[]')
const server = express()

server.use('/api',(req,res) =>{ // לא קשור למתודה זה שימושי לכל מתודה
    res.json({'message':'hello'})
})
server.use(express.json())// כל body שמגיע בPost מומר לאובייקט

server.use((req,res,next) =>{ // middele ware
    console.log(req.url,req.method)
    next()
})
server.get('/api',(req,res) => {
    res.json({'message':'hello'})
})

server.get('/api/search',(req,res) =>{ // אסור להשתמש באותו נתיב לquery
    const {name} = req.query
    res.json({message:'hello ' + name})
})

server.get('/api/:name',(req,res) => { //path params תמיד אחרי query
    res.json({'message':'Hello' + req.params.name})
})

server.post('/api', async (req,res) =>{
    try{
    const {username,password} =req.body
    if (!username || username.length <2){
        res.status(400).json({'message':'username must include 2 characters at least'})
    }
    if (!password || password.length <6){
        res.status(400).json({'message':'password must include 6 characters at least'})
    }
    const fileContent =  await fs.readFile('users.json',"utf-8")
    const users = JSON.parse(fileContent)
    const id = Math.max(0,...users.map(user => user.id)) + 1
    users.push(id,username,password)
    await fs.writeFile('users.json',JSON.stringify(users,null,2))
    res.status(201).send({message:'user created!'},id)
    }
    catch(error){
        res.status(500).json({message:'server internal error'})
    }})
server.put('/api/:id',async (req,res) =>{
    try{
        const filecontent =  await fs.readFile('users.json',"utf-8")
        const users = JSON.parse(filecontent)
        const user = users.find(user => user.id === +req.params.id)
        const {username = user.username,password = user.password} = req.body
        Object.assign(user,{username,password})
        await fs.writeFile('users.json',JSON.stringify(users,null,2))
        res.json({message:"update success"})
    }
    catch(err){
        res.status(500).json({message:'server internal error'})
    }
})

server.delete('/api/:id', async (req,res) =>{
    try{
    const filecontent = await fs.readFile('users.json',"utf-8")
    const users = JSON.parse(filecontent)
    const filterUsers = user.filter(user => user.id  !== +req.params.id)
    await fs.writeFile('users.json',JSON.stringify(filterUsers),null,2)
    res.send({mesage:`User: ${req.params.id} died`})
   }
   catch(err){
    res.status(500).json({message:'sever internal error'})
   }     
})

server.listen(3000,() => console.log('LIsten on port 3000')) 

