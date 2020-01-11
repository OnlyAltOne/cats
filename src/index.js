require('./db/mongoose')
const express = require('express')
const app = express()
const path = require('path')
const blogRouter = require('./routers/blog')
const catsRouter = require('./routers/cat')
const userRouter = require('./routers/user')
const viewsPath = path.join(__dirname, '../templates/views')


const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.json())
app.use(blogRouter)
app.use(catsRouter)
app.use(userRouter)

app.get('', (req, res) => {
    res.render('index', {
        title: 'kitten app',
        name: 'V.V'
    })
})


app.listen(port, () =>{
    console.log('Server is up on port ' + port + '.')
})