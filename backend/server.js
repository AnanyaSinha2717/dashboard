require('dotenv').config()
const express = require('express')


const memberRoutes = require('./routes/members')

const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json()) // checks if req has body, if it does, then passes it to database
// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

// routes

app.use('/api/members', memberRoutes)


// connecting to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    });

// 404 page
app.use((req, res, next) => {
    res.status(404);
    res.json({ mssg: "404" });
    // res.render("404", { pageTitle: "404" });
});

