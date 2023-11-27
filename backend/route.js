
const express = require("express")
const path = require("path")
const app = express()

const UserCollection = require("./schema")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))




app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})




app.post('/signup', async (req, res) => {
    
    

    const data = {
        UserName: req.body.UserName,
        password: req.body.password,
        EmailId: req.body.EmailId,
        ProfilePhotoFilePath: req.body.password,//not sure kya aayega
        
        


    }

    const checking = await UserCollection.findOne({ name: req.body.UserName })

   try{
    if (checking.UserName === req.body.UserName && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.UserName
    })
})


app.post('/login', async (req, res) => {

    try {
        const check = await UserCollection.findOne({ name: req.body.UserName })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.UserName}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})