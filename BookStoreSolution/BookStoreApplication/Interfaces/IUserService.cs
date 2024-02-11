using BookStoreApplication.Models.DTOs;

namespace BookStoreApplication.Interfaces
{
    public interface IUserService
    {
        UserDTO Register(UserDTO userDTO);
        UserDTO Login(UserDTO userDTO);
    }
}
