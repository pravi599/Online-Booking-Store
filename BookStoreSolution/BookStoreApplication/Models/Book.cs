using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApplication.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string ISBN { get; set; }
        public DateTime PublishDate { get; set; }
        public string Username { get; set; }
        [ForeignKey("Username")]
        public User? User { get; set; } 
    }
}
