//grab user input
document.querySelector(".search").addEventListener("click", function () {
  var search = document.querySelector("#search-query").value;

  if (search.trim() === "") {
    // Display error message
    var errorMessage = document.querySelector("#error-message");
    errorMessage.textContent = "Please enter a search query.";
    errorMessage.style.display = "block";
    return; // Stop execution if there's no search query
  }

  fetchBooks(search);

  document.querySelector("#search-query").value = "";
});

//fetching data
var fetchBooks = function (query) {
  const url = "https://www.googleapis.com/books/v1/volumes?q=" + query;
  fetch(url, {
    method: "GET",
    dataType: "json",
  })
    .then((data) => data.json())
    .then((data) => {
      addBooks(data);
      document.querySelector("#error-message").style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

//extract the data
var addBooks = function (data) {
  console.log(data);
  let item = data.items;
  console.log(item);
  let books = [];

  for (let i = 0; i < item.length; i++) {
    let bookInformation = item[i];
    let book = {
      title: bookInformation.volumeInfo.title || null,
      author: bookInformation.volumeInfo.authors
        ? bookInformation.volumeInfo.authors[0]
        : null,
      imageURL: bookInformation.volumeInfo.imageLinks
        ? bookInformation.volumeInfo.imageLinks.thumbnail
        : null,
      pageCount: bookInformation.volumeInfo.pageCount || null,
      isbn: bookInformation.volumeInfo.industryIdentifiers
        ? bookInformation.volumeInfo.industryIdentifiers[0].identifier
        : null,
    };

    books.push(book);
  }

  renderBooks(books);
};

//function that renders the books
var renderBooks = function (bookData) {
  document.querySelector(".books").replaceChildren();
  let book = "";
  let template = "";

  for (var i = 0; i < bookData.length; i++) {
    book = bookData[i];
    template += `
        <div class="book col-md-6">
        <h4>${book.title}</h4>
        <div>Author: <strong>${book.author}</strong></div>
        <div>Pages: <strong>${book.pageCount}</strong></div>
        <div>ISBN: <strong>${book.isbn}</strong></div>
        <img src="${book.imageURL}" alt="">
        </div>`;
  }

  let element = document.querySelector(".books");
  element.innerHTML += template;
};
