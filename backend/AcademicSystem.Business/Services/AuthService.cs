//(damian)
using AcademicSystem.Data.Context;
using AcademicSystem.Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AcademicSystem.Business.Services;

public class AuthService : IAuthService
{
    private readonly AcademicSystemContext _context;
    private readonly PasswordHasher<User> _hasher = new PasswordHasher<User>();

    public AuthService(AcademicSystemContext context)
    {
        _context = context;
    }

    public User? Login(string email, string password)
    {
        // buscar al usuario activo por correo electrónico, cargando también su rol y perfil
        User? user = _context.Users
            .Include(u => u.Role)
            .Include(u => u.Student)
            .Include(u => u.AcademicSecretary)
            .FirstOrDefault(u => u.Email == email && u.IsActive);

        if (user == null)
        {
            return null;
        }

      // la contraseña se almacena como un hash, por lo que se compara con VerifyHashedPassword
        PasswordVerificationResult result =
            _hasher.VerifyHashedPassword(user, user.PasswordHash, password);

        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        // solo los estudiantes y secretario academico pueden iniciar sesion
        if (user.Role.Name != RoleNames.Student && user.Role.Name != RoleNames.AcademicSecretary)
        {
            return null;
        }

        return user;
    }
}