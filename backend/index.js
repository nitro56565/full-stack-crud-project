const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2');
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mahesh',
    password: 'maheshnitro@123'
  });

app.get('/', (req, res) =>{
    res.send('Hello World!')
})

app.get('/api/data/:id', (req, res) =>{
    let {id} = req.params
    let q = "SELECT * FROM colours WHERE id = ?"
    try {
        connection.query(q,[id],(err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/api/data', (req, res) =>{
    let q = "SELECT * FROM colours"
    try {
        connection.query(q,(err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/update/:id',(req,res)=>{
    let {id} = req.params
    console.log(id);
})

app.post('/new',(req,res)=>{
    let q = 'INSERT INTO colours (`id`,`color`,`value`) VALUES (?)'
    let values = [
        req.body.id,
        req.body.color,
        req.body.value
        
    ]
        connection.query(q,[values],(err, result)=>{
            if(err) throw err;
            return res.send(result)
    })

})

app.patch('/update/:id',(req,res)=>{
    let q = 'UPDATE colours SET `color`= ? ,`value` = ? WHERE id = ?'
    let values = [
        req.body.color,
        req.body.value
    ]
    let id = req.params.id
        connection.query(q,[...values, id],(err, result)=>{
            if(err) throw err;
            return res.send(result)
    })

})

app.delete('/api/data/:id',(req, res)=>{
    let q = 'DELETE FROM colours WHERE id = ?'
    let id = req.params.id
        connection.query(q,[id],(err, result)=>{
            if(err) throw err;
            return res.send(result)
    })
})

app.listen(port, () => console.log(`listening on port ${port}!`))