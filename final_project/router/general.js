const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 return res.status(200).json({books: JSON.stringify(books)}); 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let bookFound = null;
    for (const id in books) {
        if (books[id].isbn === isbn) {
            bookFound = books[id];
            break;  }
    }

    if (bookFound) {
        return res.status(200).json(bookFound);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const booksByAuthor = [];

    for (const id in books) {
        if (books[id].author.toLowerCase() === author.toLowerCase()) {
            booksByAuthor.push(books[id]);
        }
    }

    if (booksByAuthor.length > 0) {
        return res.status(200).json({books: booksByAuthor});
    } else {
        return res.status(404).json({message: "Books by this author not found"});
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksByTitle = [];

    for (const id in books) {
        if (books[id].title.toLowerCase().includes(title.toLowerCase())) {
            booksByTitle.push(books[id]);
        }
    }

    if (booksByTitle.length > 0) {
        return res.status(200).json({books: booksByTitle});
    } else {
        return res.status(404).json({message: "Books with this title not found"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let bookFound = null;
    
    for (const id in books) {
        if (books[id].isbn === isbn) {
            bookFound = books[id];
            break;
        }
    }

    if (bookFound) {
        return res.status(200).json({reviews: bookFound.reviews});
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = public_users;
