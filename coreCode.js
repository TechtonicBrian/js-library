//Library constructor (singleton), essentially a function that will house an array
var Library = function() {
  this.books = new Array();
};

//Library instantiation, creating empty books array
this.library = new Library();

//Book constructor, with object properties - AKA Book skeleton
var Book = function(objectWithArgs) {
  this.title = objectWithArgs.title;
  this.author = objectWithArgs.author;
  this.numberOfPages = objectWithArgs.numberOfPages;
  this.publishDate = new Date(objectWithArgs.publishDate);
};

//AddBook functionality
Library.prototype.addBook = function(book) {
  for (var i = 0; i < this.books.length; i++) { //loop/iterate through all indeces of books
    if (this.books[i].title === book.title) { //check if title of incoming book matches title of current index in books
      return false;
    }
  }
  this.books.push(book); //otherwise, add book object
  return true;
};

var bookOne = new Book({title:"Coding for Dummies", authorName:"Nikhil Abraham", numberOfPages: 303, publishDate: "01/01/1999"});
var bookTwo = new Book({title:"Javascript: the definitive guide", authorName:"David Flanagan", numberOfPages: 453, publishDate: "01/01/1999"});
var bookThree = new Book({title:"Front-end web development: the Big Nerd Ranch Guide", authorName:"Chris Aquino", numberOfPages: 546, publishDate: "01/01/1999"});
var bookFour = new Book({title:"Web Development Foundations: Full-Stack vs Front-End", authorName:"Ray Villalobos", numberOfPages: 1010, publishDate: "01/01/1999"});
var bookFive = new Book({title:"Getting a coding job for dummies", authorName:"Nikhil Abraham", numberOfPages: 297, publishDate: "01/01/1999"});

//RemoveBookByTitle functionality
Library.prototype.removeBookByTitle = function(title) {
  for (var i = 0; i < this.books.length; i++) { //loop/iterate through all indeces of books
    if (this.books[i].title === title) { //check if string matches title of current index in books
        this.books.splice(i, 1); //delete index of array
        return true;
    }
  }
  return false;
};

//RemoveBooksByAuthor functionality
Library.prototype.removeBooksByAuthor = function(authorName) {
  var temp = []; //create a new empty array in scope of function
  for (var i = 0; i < this.books.length; i++) { //loop/iterate through all indeces of books
    if (this.books[i].authorName !== authorName) { //check if string does not match authorName of current index in books
      temp.push(this.books[i]); //return book object(s) as array
    }
  }
  if (temp.length < this.books.length) { //if new array is smaller than original array
    this.books = temp; //assign value of orig array to new array
    return true;
  }
  return false; //otherwise, return false
};

//GetRandomBook functionality
Library.prototype.getRandomBook = function() {
  if (this.books.length == 0) { //check if array is empty
    return null;
  }
    return this.books[Math.floor(Math.random()*this.books.length)]; //otherwise, return random book object
};

//GetBooksByTitle functionality
Library.prototype.getBooksByTitle = function(title) {
  var temp = []; //create a new empty array in scope of function
  for (var i = 0; i < this.books.length; i++) { //loop/iterate through all indeces of books
    if (this.books[i].title.toLowerCase().indexOf(title.toLowerCase()) !== -1) { //check if titles in books contain parameter
      temp.push(this.books[i]); //return book object(s) as array
    }
  }
  return temp; //otherwise, return new empty array
};

//GetBooksByAuthor functionality
Library.prototype.getBooksByAuthor = function(authorName) {
  var temp = []; //create new empty array in scope of function
  for (var i = 0; i < this.books.length; i++) { //loop/iterate through all indeces of books
    if (this.books[i].authorName.toLowerCase().indexOf(authorName.toLowerCase()) !== -1) { //check if names in books contain parameter
      temp.push(this.books[i]); //return book object(s)
    }
  }
  return temp; //otherwise, return new empty array
};

//AddBooks functionality
Library.prototype.addBooks = function(books) {
  var bookCount = 0;
  for (var i = 0; i < books.length; i++) { //loop/iterate through all indeces of books parameter
    if (this.addBook(books[i])) { //check if index element needs addBook function
      bookCount++;
    }
  }
  return bookCount;
};

var booksArray = [
  new Book({title:"Coders at Work: Reflections on the Craft of Programming", authorName:"Peter Seibel", numberOfPages: 1303, publishDate: "01/01/1999"}),
  new Book({title:"Code Complete: A Practical Handbook of Software Construction", authorName:"Steve McConnell", numberOfPages: 336, publishDate: "01/01/1999"}),
  new Book({title:"The Grid", authorName:"Peter Seibel", numberOfPages: 179, publishDate: "01/01/1999"})
];

//GetAuthors functionality
Library.prototype.getAuthors = function() {
  var temp = []; //create new empty array in scope of function
  for (var i = 0; i < this.books.length; i++) { //loop/iterate through all indeces of books
    if (temp.indexOf(this.books[i].authorName) === -1) { //
      temp.push(this.books[i].authorName); //return authorName values
    }
  }
  return temp; //otherwise, return new empty array
};

//GetRandomAuthorName functionality
Library.prototype.getRandomAuthorName = function() {
  if (this.books.length == 0) { //check if array is empty
    return null;
  }
    return this.books[Math.floor(Math.random()*this.books.length)].authorName; //otherwise, return random authorName string
};
