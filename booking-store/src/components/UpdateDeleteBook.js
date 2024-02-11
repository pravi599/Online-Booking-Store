import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateDelete.css';
import './Books.css'; // Import your CSS file for styling

const UpdateDelete = ({ bookId }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://localhost:7170/api/Book/${bookId}`);
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setIsbn(book.isbn);
        setPublishDate(new Date(book.publishDate).toISOString().split('T')[0]);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.get(`https://localhost:7170/api/Book/${bookId}`);
      const book = response.data;

      await axios.put(`https://localhost:7170/api/Book/${bookId}`, {
        ...book, // Include existing book properties
        title,
        author,
        genre,
        isbn,
        publishDate
      });
      alert('Book updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7170/api/Book/${bookId}`);
      alert('Book deleted successfully!');
      // Optionally, you can remove the book from the list or perform any other action after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={`update-delete-container ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />

          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />

          <label>Publish Date:</label>
          <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />

          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="edit-button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default UpdateDelete;
