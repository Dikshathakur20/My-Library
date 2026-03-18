const myLibrary = [];

// 1. Added the ID to the constructor using crypto.randomUUID()
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID(); // This was missing
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    // FIX 1: Corrected "libarary" typo to "library" (match your HTML ID)
    const container = document.getElementById('library-container'); 
    if (!container) return; // Safety check
    
    container.innerHTML = '';
     
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.setAttribute('data-id', book.id);

        // FIX 2: Used 'book.isRead' instead of 'isRead' (which was undefined here)
        card.innerHTML = `
        <h3>${book.title}</h3>
        <p>By ${book.author}</p>
        <p>${book.pages} pages</p>
        <p class="read-status">${book.isRead ? '✅ Read' : '📖 Not Read Yet'}</p>
        <button class="toggle-btn"> Change Status </button>
        <button class="remove-btn"> Remove </button>
        `;

        // FIX 3: Added "." for class selectors in querySelector
        card.querySelector('.toggle-btn').addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });

        card.querySelector('.remove-btn').addEventListener('click', () => {
            removeBook(book.id);
        });

        // FIX 4: Changed "Card" (capital C) to "card" (lowercase)
        container.appendChild(card);
    });
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index > -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

const dialog = document.getElementById('book-dialog');
const showBtn = document.getElementById('new-book-btn');
const closeBtn = document.getElementById('close-btn');
const form = document.getElementById('book-form');

// Only add listeners if elements exist to avoid the "null" error
if (showBtn) showBtn.addEventListener('click', () => dialog.showModal());
if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ensure these IDs match your HTML exactly!
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const isRead = document.getElementById('isRead').checked;

        addBookToLibrary(title, author, pages, isRead);

        form.reset();
        dialog.close();
    });
}

// Initial seed data
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);