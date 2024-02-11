using BookStoreApplication.Models.DTOs;

namespace BookStoreApplication.Interfaces
{
    public interface ITokenService
    {
        string GetToken(UserDTO user);
    }
}
