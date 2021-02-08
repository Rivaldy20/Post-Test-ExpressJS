const express = require('express');
const route = express.Router();
let buku = require('../db/books.json')

//Menampilkan semua data buku yang tersedia
route.get('/api/v1/books', (req, res) => {
    res.status(200).json(buku)
})

//Menampilkan data buku berdasarkan ID
route.get('/api/v1/books/:id', (req, res) => {
    const book = buku.find(i => i.id === +req.params.id)
    res.status(200).json(book)
})

//Menambah daftar buku
route.post('/api/v1/books', (req, res) => {
    console.log(req.body)
    const { isbn, judul, sinopsis, penulis, genre } = req.body
    const id = buku[buku.length - 1].id + 1
    const book = {
        id,
        isbn,
        judul,
        sinopsis,
        penulis,
        genre
    }
    buku.push(book)
    res.status(201).json(buku)
})

//Mengubah data pada buku berdasarkan ID
route.put('/api/v1/books/:id', (req, res) => {
    const id = req.params.id
    buku.filter(book => {
        if (book.id == id) {
            book.isbn = req.body.isbn,
                book.judul = req.body.judul,
                book.sinopsis = req.body.sinopsis,
                book.penulis = req.body.penulis,
                book.genre = req.body.genre
            return book
        }
    })
    res.status(200).json(buku)
})

//Menghapus daftar buku berdasarkan ID
route.delete('/api/v1/books/:id', (req, res) => {
    buku = buku.filter(i => i.id !== +req.params.id)
    res.status(200).json(buku)
})

module.exports = route;