 const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const connection = require('./db')

const userouts=require('./Routes/user_routes') 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userouts)




app.get('/', (req, res) => {
  res.send('Hello World!')
})

connection.db_connection()

app.listen(3000, () => {
  console.log("Example app listening on port 3000:",3000)
})
// entry1.insert_data()