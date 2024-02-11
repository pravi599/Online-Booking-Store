import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    publishDate: new Date().toISOString().split('T')[0], // Default to current date
    username: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch username from local storage and set it in the form data
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setFormData({ ...formData, username: storedUsername });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7170/api/Book', formData);
      setMessage('Book added successfully!');
      setError('');
      // Clear form after successful submission
      setFormData({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        publishDate: new Date().toISOString().split('T')[0],
        username: formData.username
      });
    } catch (error) {
      setMessage('');
      setError('Error adding book: ' + error.message);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Author:</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />

        <label>Genre:</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />

        <label>ISBN:</label>
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />

        <label>Publish Date:</label>
        <input type="date" name="publishDate" value={formData.publishDate} onChange={handleChange} required />

        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required disabled />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
