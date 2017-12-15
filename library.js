//Library constructor (singleton), essentially a function that will house an array
var Library = function() {
  this.books = new Array();
};

//Book constructor, with object properties - AKA Book blueprint
var Book = function(oArgs) {
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numberOfPages = oArgs.numberOfPages;
  this.publishDate = new Date(oArgs.publishDate);
};

//Initial function that runs on Document ready
Library.prototype.init = function() {
  this._bindEvents();

  // Admin
  $("#adminMgmt").hide();
  $("#toggleAdmin").on("click", function(){
    $("#adminMgmt").toggle(500);
  });

  // Add more books form incrementer and button management
  $("#addBooksButton").hide();
  $("#oneMoreBookButton").on("click", function() {
    $("#oneMoreBookForm:last").clone().appendTo($("#addBooksRow"));
    $("#addBooksButton").show();
    $("#addBookButton").hide();
  });

  // Remove title or author form selection
  $(function() {
    var $select = $("#removeBySelector"),
        $forms = $(".toggleRemove");
    $select.on("change", function() {
      var value = "." + $(this).val();
      $forms.show().not(value).hide();
    });
  });

  // Basic search form selection - NEEDS ATTENTION
  $(function() {
    var $select = $("#searchBySelector"),
        $forms = $(".toggleBasicSearchBy");
    $select.on("change", function() {
      var value = "." + $(this).val();
      $forms.show().not(value).hide();
    });
  });

};

//Event handlers that bind events to functions
Library.prototype._bindEvents = function() {
  $("#addBookButton").on("click", $.proxy(this._handleAddBook, this));
  $("#addBooksButton").on("click", $.proxy(this._handleAddBooks, this));
  $("#removeByTitleButton").on("click", $.proxy(this._handleRemoveBooksByTitle, this));
  $("#removeByAuthorButton").on("click", $.proxy(this._handleRemoveBooksByAuthor, this));
  //NEED HANDLER FOR GET ALL BOOKS?
  $("#getRandomBookButton").on("click", $.proxy(this._handleGetRandomBook, this));
  $("#getAllAuthorsButton").on("click", $.proxy(this._handleGetAuthors, this));
  $("#getRandomAuthorNameButton").on("click", $.proxy(this._handleGetRandomAuthorName, this));
  $("#searchByKeywordButton").on("click", $.proxy(this._handleGetBooksByKeyword, this));
  $("#searchByTitleButton").on("click", $.proxy(this._handleGetBooksByTitle, this));
  $("#searchByAuthorButton").on("click", $.proxy(this._handleGetBooksByAuthor, this));
};

//AddBook functionality
Library.prototype.addBook = function(book) {
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i].title === book.title) {
      return false;
    }
  }
  this.books.push(book);
  return true;
};

Library.prototype._handleAddBook = function(oArgs) {
  var newBook = new Book(oArgs);
    newBook.title = $("#addTitle").val();
    newBook.author = $("#addAuthor").val();
    newBook.numberOfPages = $("#addNumberOfPages").val();
    newBook.publishDate = $("#addPublishDate").val();
  this.addBook(newBook);
};

//AddBooks functionality
Library.prototype.addBooks = function(books) {
  var bookCount = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      bookCount++;
    }
  }
  return bookCount;
};

//NEEDS ATTENTION
Library.prototype._handleAddBooks = function(oArgs) {
  for (var i = 0; i < oArgs.length; i++) {
    this.addBook(newBook);
  }
};

//RemoveBooksByTitle functionality
Library.prototype.removeBooksByTitle = function(title) {
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i].title === title) {
        this.books.splice(i, 1);
        return true;
    }
  }
  return false;
};

Library.prototype._handleRemoveBooksByTitle = function() {

};

//RemoveBooksByAuthor functionality
Library.prototype.removeBooksByAuthor = function(authorName) {
  var temp = [];
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i].author !== authorName) {
      temp.push(this.books[i]);
    }
  }
  if (temp.length < this.books.length) {
    this.books = temp;
    return true;
  }
  return false;
};

Library.prototype._handleRemoveBooksByAuthor = function() {

};

//BROWSE FUNCTIONALITY??? - SHOW FULL LIBRARY

//GetRandomBook functionality
Library.prototype.getRandomBook = function() {
  if (this.books.length === 0) {
    return null;
  }
    return this.books[Math.floor(Math.random()*this.books.length)];
};

Library.prototype._handleGetRandomBook = function() {

};

//GetAuthors functionality
Library.prototype.getAuthors = function() {
  var temp = [];
  for (var i = 0; i < this.books.length; i++) {
    if (temp.indexOf(this.books[i].author) === -1) {
      temp.push(this.books[i].author);
    }
  }
  return temp;
};

Library.prototype._handleGetAuthors = function() {

};

//GetRandomAuthorName functionality
Library.prototype.getRandomAuthorName = function() {
  if (this.books.length === 0) {
    return null;
  }
    return this.books[Math.floor(Math.random()*this.books.length)].author;
};

Library.prototype._handleGetRandomAuthorName = function() {

};

// Robust Search functionality (by Keyword)
Library.prototype.getBooksByKeyword = function(keyword) {
  var temp = [];
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i].title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || this.books[i].author.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
      temp.push(this.books[i]);
    }
  }
  return temp;
};

Library.prototype._handleGetBooksByKeyword = function() {

};

//GetBooksByTitle functionality
Library.prototype.getBooksByTitle = function(title) {
  var temp = [];
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i].title.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
      temp.push(this.books[i]);
    }
  }
  return temp;
};

Library.prototype._handleGetBooksByTitle = function() {

};

//GetBooksByAuthor functionality
Library.prototype.getBooksByAuthor = function(authorName) {
  var temp = [];
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i].author.toLowerCase().indexOf(authorName.toLowerCase()) !== -1) {
      temp.push(this.books[i]);
    }
  }
  return temp;
};

Library.prototype._handleGetBooksByAuthor = function() {

};

//Array of books
var booksArray = [
  new Book({title:"Coders at Work: Reflections on the Craft of Programming", author:"Peter Seibel", numberOfPages: 1303, publishDate: "01/01/1999"}),
  new Book({title:"Code Complete: A Practical Handbook of Software Construction", author:"Steve McConnell", numberOfPages: 336, publishDate: "01/01/1999"}),
  new Book({title:"The Grid", author:"Peter Seibel", numberOfPages: 179, publishDate: "01/01/1999"})
];

//Individual books
var gBookOne = new Book({title:"Coding for Dummies", author:"Nikhil Abraham", numberOfPages: 303, publishDate: "01/01/1999"});
var gBookTwo = new Book({title:"Javascript: the definitive guide", author:"David Flanagan", numberOfPages: 453, publishDate: "01/01/1999"});
var gBookThree = new Book({title:"Front-end web development: the Big Nerd Ranch Guide", author:"Chris Aquino", numberOfPages: 546, publishDate: "01/01/1999"});
var gBookFour = new Book({title:"Web Development Foundations: Full-Stack vs Front-End", author:"Ray Villalobos", numberOfPages: 1010, publishDate: "01/01/1999"});
var gBookFive = new Book({title:"Getting a coding job for dummies", author:"Nikhil Abraham", numberOfPages: 297, publishDate: "01/01/1999"});

//Display functions




//Document ready
$(function(){
  window.library = new Library()
  window.library.init()
});
