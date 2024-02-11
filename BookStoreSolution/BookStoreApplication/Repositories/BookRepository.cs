using BookStoreApplication.Contexts;
using BookStoreApplication.Interfaces;
using BookStoreApplication.Models;

namespace BookStoreApplication.Repositories
{
    public class BookRepository : IRepository<int, Book>
    {
        private readonly BookingDbContext _context;
        public BookRepository(BookingDbContext context)
        {
            _context = context;
            
        }
        public Book Add(Book entity)
        {
            _context.Books.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Book Delete(int bookId)
        {
            var book = _context.Books.Find(bookId);
            if (book != null)
            {
                _context.Books.Remove(book);
                _context.SaveChanges();
                return book;
            }
            return null;
        }

        public IList<Book> GetAll()
        {
            if(_context.Books.Count()==0)
            {
                return null;
            }
            return _context.Books.ToList();
        }

        public Book GetById(int bookId)
        {
            return _context.Books.FirstOrDefault(r => r.BookId == bookId);
        }

        public Book Update(Book book)
        {
            _context.Books.Update(book);
            _context.SaveChanges();
            return book;
        }
    }
}
