using BookStoreApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApplication.Contexts
{
    public class BookingDbContext : DbContext
    {
        public BookingDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
    }
}
