/* npm i init

"start": "nodemon ./index.js localhost 3000"

npm i nodemon

npm i express

npm i express-handlebars

npm i mysql */


/*



*/


const express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended:true,
    })
)

app.use(express.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.use(express.static('public'))


app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/password', (req, res) =>{
    res.render('password')
})

app.get('/account', (req, res) =>{
    res.render('account')
})

app.get('/login', (req, res) =>{
    res.render('login')
})

app.get('/index', (req, res) =>{
    res.render('index')
})

app.get('/inicial', (req, res) =>{
    res.render('inicial')
})

app.get('/servicos', (req, res) =>{
    res.render('servicos')
})

app.get('/contato', (req, res) =>{
    res.render('contato')
})

app.get('/quemsomos', (req, res) =>{
    res.render('quemsomos')
})



app.post('/estudantes/insertestudantes', (req, res) =>{
    const name = req.body.name
    const serie = req.body.serie

    const sql = `INSERT INTO estudantes (nome, serie) VALUES ('${name}', '${serie}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.get('/estudantes', (req,res) =>{
    const sql = ' SELECT * FROM estudantes'

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const estudantes = data
        console.log(estudantes)
        res.render('estudantes',{estudantes})

    })
})

app.get('/estudantes/:id', (req,res) =>{

    const id = req = req.params.id
    
    const sql = (`SELECT * FROM  estudantes where id =${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const estudante = data[0]

        res.render('estudante', {estudante})
    })
})

app.get('/estudantes/edit/:id', (req,res) =>{
    const id = req.params.id
    const sql = (`SELECT * FROM estudantes WHERE id = ${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const estudante = data[0]

        res.render('editestudante', {estudante})
    })
})

app.post('/estudantes/updateestudante', (req, res) =>{

    const id = req.body.id
    const nome = req.body.name
    const serie = req.body.serie
    
    const sql = (`UPDATE estudantes SET nome = '${nome}', serie = '${serie}' WHERE  id = ${id}`)


    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/estudantes')
    })
})



app.post('/estudantes/remove/:id', (req, res) =>{
    const id = req.params.id
    const sql = `DELETE FROM estudantes WHERE id = ${id}`

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/estudantes')
    })
})




const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'senac'

})

conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('conectou com DB')

    app.listen(3000)
})