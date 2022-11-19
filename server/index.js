// boiler code
const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

const db = require('./models')

//Routes

const postsRouter = require('./routes/Posts')
app.use("/posts", postsRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on 3001')
    })
})