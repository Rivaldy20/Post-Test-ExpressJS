const express = require('express')
const booksRouter = require("./Router/books")
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(booksRouter)

app.get('/', function(req, res) {
    console.log(req.url)
    res.send('Hai, sekarang kamu berada di url utama daftar buku')
})


app.use((req, res, next) => {
    res.status(404).json({
        status: "fail",
        errors: "sepertinya kamu salah memasukan url"
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        status: "fail",
        errors: err.message
    })
})

app.listen(4000, () => {
    console.log('Server nyala di port 4000!')
})