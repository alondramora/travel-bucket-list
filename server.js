const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const PORT = 3000


let db, // declaring database variable for reference later
    connectionString = process.env.DB_CONNECTION, // Store db connection inside variable
    dbName = 'travel-journal-entries' //name of the database in mongodb

  
MongoClient.connect(connectionString, {useUnifiedTopology: true})
  .then (client => {
    console.log(`Connected to DB ${dbName}`)
    db = client.db(dbName) // Database
    const entriesCollection = db.collection('entries-collection') // Collection

  //Set middleware
    app.set('view engine', 'ejs') // Setting the view engine as ejs for dynamic html
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    // GET METHOD
    app.get('/', (req, res) => {
      entriesCollection.find().toArray()
        .then(results => {
          console.log(results)
        res.render('index.ejs', { info : results}) // info is an OBJECT used when you render your EJS, results are going inside of that object. You can access this object in your ejs. 
        })
        .catch(error => console.error(error))
    }) 

    // POST METHOD
    app.post('/', (req, res) => {
      entriesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        console.log(result)
        })
        .catch(error => console.error(error))
    })
    
    //EDIT/UPDATE METHOD
    // code goes here 
    

    //DELETE METHOD
    // app.delete('/deleteEntry'(req, res) => {
    //   console.log(request)
    //   entriesCollection.deleteOne({ entry? : request.body.}) // Need to fix this line
    //     .then(result => {
    //       console.log('Entry Deleted')
    //       res.json('Rapper Deleted')
    //     })
    //   .catch(error => console.error(error))
    // })


    //LISTEN
    app.listen(PORT, () => console.log(`Server is running on port ${PORT} 🎸`))

  })

  .catch(error => console.error(error))