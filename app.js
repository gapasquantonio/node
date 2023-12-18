const express = require("express")

const app = express()
app.use()



app.use('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Procuct</button></input></form>')
});
app.use('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect("/")

})
app.use('/', (req, res) => {
    res.send('<h1>Hello from Express!!</h1>')

})

app.listen(3000)