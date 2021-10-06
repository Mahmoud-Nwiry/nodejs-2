const express = require('express')
const app = express();
app.use(express.json())

const users = [
  {
    id: 1,
    isActive: true,
    balance: "$1,111.15",
    picture: "http://placehold.it/32x32",
    age: 37,
    name: "Elsa Castaneda",
    gender: "female",
    company: "OTHERWAY",
    email: "elsacastaneda@otherway.com",
    phone: "+1 (988) 404-2932",
  },
  {
    id: 2,
    isActive: true,
    balance: "$1,823.59",
    picture: "http://placehold.it/32x32",
    age: 35,
    name: "Ollie Osborn",
    gender: "female",
    company: "VIASIA",
    email: "ollieosborn@viasia.com",
    phone: "+1 (947) 442-2611",
  },
  {
    id: 3,
    isActive: true,
    balance: "$1,734.78",
    picture: "http://placehold.it/32x32",
    age: 29,
    name: "Dean Huff",
    gender: "male",
    company: "NORALEX",
    email: "deanhuff@noralex.com",
    phone: "+1 (816) 575-2363",
  },
];

const children = [
  {
    id: 11,
    name: "Christina Bray",
    parent_id: 1,
    age: 6,
    },
  {
    id: 12,
    name: "Farrell Boone",
    parent_id: 1,
    age: 4,
  },
  {
    id: 13,
    name: "Gary Maddox",
    parent_id: 2,
    age: 4,
  },
  {
    id: 14,
    name: "Helena Burt",
    parent_id: 2,
    age: 6,
  },
  {
    id: 15,
    name: "Beryl Duke",
    parent_id: 2,
    age: 7,
  },
];

app.get('/',(req,res)=>res.send("Welcome"))

app.get('/users',(req,res)=>{
  res.json(users)
})

app.get('/user/:id',(req,res)=>{
  const id = req.params.id
  const user = users.find(user=> user.id == id)

  if(user){
    res.json(user)
  }else{
    res.status(404).json({"msg":"This id is not found"})
  }
})


app.delete('/user/:id',(req,res)=>{
  const id = req.params.id
  const user = users.find(user=>user.id == id)

  if(!user){
    res.status(404).json({"msg":"this user is not found"})
  }else{
    const index = users.indexOf(user)
    users.splice(index,1)
    res.status(204).end()
  }
})

app.post('/users',(req,res)=>{
  const body = req.body

  if(!users.find(user=>user.id == body.id)){
    if(body.isActive === false || body.isActive === true){
      if(body.id != "" && body.balance != "" && body.picture != "" && body.age != "" && body.name != ""
         && body.gender != "" && body.company != "" && body.email != "" && body.phone != ""){
           users.push(body)
           res.status(200).json(body)
        }
        else{
          res.status(400).json({"msg":"somefield not found or empty"})
        }
    }
    else{
      res.status(400).json({"msg":"somefield not found or empty"})
    }
  }
  else{
    res.status(404).json({"msg":"this id alredy found"})
  }
})

app.get('/user/:id/children',(req,res)=>{
  const id = req.params.id
  const child = children.filter(child=> child.parent_id == id)

  if(child.length !== 0){
    res.json(child)
  }else{
    res.status('404').json({"msg":"this user not found or have not any children"})
  }

})

app.get('/user/:id/child/:childId',(req,res)=>{
  const id = req.params.id
  const childId = req.params.childId
  const child = children.filter(child=> child.parent_id == id)
  const oneChild = child.find(child=>child.id == childId)

  if(oneChild){
    res.json(oneChild)
  }else{
    res.status('404').json({"msg":"this user not found or have not any children"})
  }

})


app.delete('/user/:id/child/:childId',(req,res)=>{
  const id = req.params.id
  const childId = req.params.childId
  const child = children.filter(child=> child.parent_id == id)
  const oneChild = child.find(child=>child.id == childId)

  if(oneChild){
    const index = children.indexOf(oneChild);
    children.splice(index,1)
    res.status(204).end()
  }else{
    res.status('404').json({"msg":"this user not found or have not any children with this id"})
  }
})

app.post('/user/:id/children',(req,res)=>{
  const id = req.params.id
  const body = req.body
  const user = users.find(user=>user.id == id)
    
  if(user){
    if(!children.find(child=>child.id == body.id)){
      body.parent_id = id
      if(body.id != "" && body.name != "" && body.age != ""){
        children.push(body)
        res.status(200).send(body)
      }else{
        res.status(400).json({"msg":"somefield not found or empty"})
      }
    }else{
      res.status(404).json({"msg":"The Child id is already found"})
    }
  }
  else{
    res.status(404).json({"msg":"This User is not found"})
  }
})

app.listen(3000,()=>console.log("server running  http://localhost:3000"))