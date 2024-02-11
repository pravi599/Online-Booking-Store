using System;
using System.Collections.Generic;
using System.Linq;
using BookStoreApplication.Exceptions;
using BookStoreApplication.Interfaces;
using BookStoreApplication.Models;
using BookStoreApplication.Models.DTOs;

namespace BookStoreApplication.Services
{
    public class BookService : IBookService
    {
        private readonly IRepository<int, Book> _bookRepository;

        public BookService(IRepository<int, Book> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public bool Add(BookDTO bookDTO)
        {
            try
            {
                var book = new Book
                {
                    Title = bookDTO.Title,
                    Author = bookDTO.Author,
                    Genre = bookDTO.Genre,
                    ISBN = bookDTO.ISBN,
                    PublishDate = bookDTO.PublishDate,
                    Username = bookDTO.Username
                };
                _bookRepository.Add(book);
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                return false;
            }
        }

        public IEnumerable<BookDTO> GetAllBooks()
        {
            try
            {
                var books = _bookRepository.GetAll();
                return books.Select(b => new BookDTO
                {
                    BookId = b.BookId,
                    Title = b.Title,
                    Author = b.Author,
                    Genre = b.Genre,
                    ISBN = b.ISBN,
                    PublishDate = b.PublishDate,
                    Username = b.Username
                });
            }
            catch (Exception ex)
            {
                // Log the exception
                return null;
            }
        }

        public IEnumerable<BookDTO> GetBookByAuthor(string author)
        {
            try
            {
                var booksByAuthor = _bookRepository.GetAll().Where(b => b.Author == author);
                return booksByAuthor.Select(b => new BookDTO
                {
                    BookId = b.BookId,
                    Title = b.Title,
                    Author = b.Author,
                    Genre = b.Genre,
                    ISBN = b.ISBN,
                    PublishDate = b.PublishDate,
                    Username = b.Username
                });
            }
            catch (Exception ex)
            {
                // Log the exception
                return null;
            }
        }

        public BookDTO GetBookById(int bookId)
        {
            try
            {
                var bookEntity = _bookRepository.GetById(bookId);
                if (bookEntity == null)
                    return null;
                return new BookDTO
                {
                    BookId = bookEntity.BookId,
                    Title = bookEntity.Title,
                    Author = bookEntity.Author,
                    Genre = bookEntity.Genre,
                    ISBN = bookEntity.ISBN,
                    PublishDate = bookEntity.PublishDate,
                    Username = bookEntity.Username
                };
            }
            catch (Exception ex)
            {
                // Log the exception
                return null;
            }
        }

        public BookDTO GetBookByTitle(string title)
        {
            try
            {
                var bookByTitle = _bookRepository.GetAll().FirstOrDefault(b => b.Title == title);
                if (bookByTitle == null)
                    return null;
                return new BookDTO
                {
                    BookId = bookByTitle.BookId,
                    Title = bookByTitle.Title,
                    Author = bookByTitle.Author,
                    Genre = bookByTitle.Genre,
                    ISBN = bookByTitle.ISBN,
                    PublishDate = bookByTitle.PublishDate,
                    Username = bookByTitle.Username
                };
            }
            catch (Exception ex)
            {
                // Log the exception
                return null;
            }
        }

        public BookDTO GetBooksByGenre(string genre)
        {
            try
            {
                var existingBook = _bookRepository.GetAll().FirstOrDefault(b => b.Genre == genre);
                if (existingBook != null)
                {
                    return new BookDTO
                    {
                        BookId = existingBook.BookId,
                        Title = existingBook.Title,
                        Author = existingBook.Author,
                        Genre = existingBook.Genre,
                        ISBN = existingBook.ISBN,
                        PublishDate = existingBook.PublishDate,
                        Username = existingBook.Username
                    };
                }
                throw new BookNotFoundException();
            }
            catch (Exception ex)
            {
                // Log the exception
                return null;
            }
        }

        public bool Remove(int bookId)
        {
            try
            {
                var removedBook = _bookRepository.Delete(bookId);
                return removedBook != null;
            }
            catch (Exception ex)
            {
                // Log the exception
                return false;
            }
        }

        public BookDTO Update(BookDTO bookDTO)
        {
            try
            {
                var updatedBook = new Book
                {
                    BookId = bookDTO.BookId,
                    Title = bookDTO.Title,
                    Author = bookDTO.Author,
                    Genre = bookDTO.Genre,
                    ISBN = bookDTO.ISBN,
                    PublishDate = bookDTO.PublishDate,
                    Username = bookDTO.Username
                };
                var result = _bookRepository.Update(updatedBook);
                return new BookDTO
                {
                    BookId = updatedBook.BookId,
                    Title = updatedBook.Title,
                    Author = updatedBook.Author,
                    Genre = updatedBook.Genre,
                    ISBN = updatedBook.ISBN,
                    PublishDate = updatedBook.PublishDate,
                    Username = updatedBook.Username
                };
            }
            catch (Exception ex)
            {
                // Log the exception
                return null;
            }
        }
    }
}
