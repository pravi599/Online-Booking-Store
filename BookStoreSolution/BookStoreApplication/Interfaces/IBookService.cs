using BookStoreApplication.Models.DTOs;

namespace BookStoreApplication.Interfaces
{
    public interface IBookService
    {
        bool Add(BookDTO bookDTO);
        bool Remove(int bookId);
        BookDTO Update(BookDTO bookDTO);
        BookDTO GetBookById(int bookId);
        IEnumerable<BookDTO> GetBookByAuthor(string author);
        BookDTO GetBooksByGenre(string genre);
        BookDTO GetBookByTitle(string title);
        IEnumerable<BookDTO> GetAllBooks();

    }
}
