import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateDelete from './UpdateDeleteBook'; 
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://localhost:7170/api/Book');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, books]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="books-container">
      <h2>All Books</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title, author, or genre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="books-list">
        {searchResults.map((book) => (
          <div key={book.bookId} className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Publish Date:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
            <UpdateDelete bookId={book.bookId} /> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
