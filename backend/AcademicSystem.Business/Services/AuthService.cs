//(damian)
using AcademicSystem.Data.Repositories;
using AcademicSystem.Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace AcademicSystem.Business.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly PasswordHasher<User> _hasher = new PasswordHasher<User>();

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public User? Login(string email, string password)
    {
        // se busca el usuario activo por correo
        User? user = _userRepository.GetActiveByEmail(email);

        if (user == null)
        {
            return null;
        }

        // la contraseña esta guardada como hash, por eso se compara con VerifyHashedPassword
        PasswordVerificationResult result =
            _hasher.VerifyHashedPassword(user, user.PasswordHash, password);

        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        // solo pueden entrar estudiantes y secretarios academicos
        if (user.Role.Name != RoleNames.Student && user.Role.Name != RoleNames.AcademicSecretary)
        {
            return null;
        }

        return user;
    }
}