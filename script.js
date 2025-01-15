var overlay = document.querySelector(".overlay");
var popup = document.querySelector(".popup");
var cancel_button = document.getElementById("cancel");
var add_button = document.getElementById("add_button");
var container = document.querySelector(".container");

var book_title = document.getElementById("book_title");
var book_author = document.getElementById("book_author");
var book_des = document.getElementById("book_description");

overlay.style.display = "none";
popup.style.display = "none";

function deletebook(event){
    event.target.parentElement.remove()
}

// Load books from LocalStorage on page load
window.onload = function () {
    loadBooksFromLocalStorage();
};

add_button.addEventListener("click", function () {
    overlay.style.display = "block";
    popup.style.display = "block";
});

cancel_button.addEventListener("click", function (event) {
    event.preventDefault();
    overlay.style.display = "none";
    popup.style.display = "none";
});

document.getElementById("add").addEventListener("click", function (event) {
    event.preventDefault();

    if (book_title.value.trim() && book_author.value.trim() && book_des.value.trim()) {
        // Create a book object
        var book = {
            title: book_title.value,
            author: book_author.value,
            description: book_des.value,
        };

        // Add book to the container and LocalStorage
        addBookToUI(book);
        addBookToLocalStorage(book);

        // Clear inputs and hide popup
        book_title.value = "";
        book_author.value = "";
        book_des.value = "";
        overlay.style.display = "none";
        popup.style.display = "none";
    } else {
        alert("Please fill in all the fields!");
    }
});

// Event delegation for delete buttons
container.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete_button")) {
        var bookContainer = event.target.closest(".book_container");
        var title = bookContainer.querySelector("h2").innerText;

        // Remove book from UI and LocalStorage
        bookContainer.remove();
        removeBookFromLocalStorage(title);
    }
});

// Function to add a book to the UI
function addBookToUI(book) {
    var div = document.createElement("div");
    div.setAttribute("class", "book_container");

    div.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <button class="delete_button">Delete</button>
    `;

    container.appendChild(div);
}

// Function to add a book to LocalStorage
function addBookToLocalStorage(book) {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

// Function to remove a book from LocalStorage
function removeBookFromLocalStorage(title) {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(function (book) {
        return book.title !== title; // Keep books that don't match the title
    });
    localStorage.setItem("books", JSON.stringify(books));
}

// Function to load books from LocalStorage
function loadBooksFromLocalStorage() {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach(function (book) {
        addBookToUI(book);
    });
}
