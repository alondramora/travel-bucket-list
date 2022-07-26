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

  




















// OLD CODE  //////////////////////////////////////////////////////////////////////
 // Connecting to the Mongo DB
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log(`Connected to Database ${connectionString}`)
//     const db = client.db('travel-journal-entries') // Database
//     const entriesCollection = db.collection('entries-collection') // Collection

//       app.set('view-engine', 'ejs') // Setting the view engine as ejs for dynamic html content

//       app.use(bodyParser.urlencoded({ extended: true })); // Might not need body parser since body parser is depricated

//     app.use(express.static('public'));
    
//     app.use(bodyParser.json())

//       app.get('/', (req, res) => {
//           entriesCollection.find().toArray()
//               .then(results => {
//                   res.render('index.ejs', { entriesCollection : results })
//               })
//               .catch(error => console.error(error))
//         });

//         // POST/CREATE
//         app.post('/dates', (req, res) => {
//           entriesCollection.insertOne(req.body)
//               .then(result => {
//                 res.redirect('/') // redirects back to the root after we have posted a new entry
//             console.log(result)
//         })
//             .catch(error => console.error(error))  
//         });
    
//       app.put('/dates', (req, res) => {
//           console.log(req.body)
//         })

//         // Listen method
//         app.listen(3000, function () {
//             console.log('listening on 3000')
//         });
//           })
//   .catch(error => console.error(error))