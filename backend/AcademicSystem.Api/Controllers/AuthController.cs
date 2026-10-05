//(damian)
using AcademicSystem.Business.Services;
using AcademicSystem.Entities.DTOs;
using AcademicSystem.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace AcademicSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    // se utilizan DTO para que nunca se devuelvan datos sensibles(como el hash de la contraseña)
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDto loginRequest)
    {
        try
        {
            if (loginRequest == null
                || string.IsNullOrWhiteSpace(loginRequest.Email)
                || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return BadRequest("Debe ingresar email y contraseña.");
            }

            User? user = _authService.Login(loginRequest.Email, loginRequest.Password);

            if (user == null)
            {
                _logger.LogWarning("Intento de inicio de sesion fallido para {Email}", loginRequest.Email);
                return Unauthorized("Email o contraseña incorrectos.");
            }

            LoginResponseDto loginResponse = new LoginResponseDto
            {
                Id = user.Id,
                FullName = user.FirstName + " " + user.LastName,
                Email = user.Email,
                Role = user.Role.Name
            };

           // solo los estudiantes tienen un legajo
            if (user.Student != null)
            {
                loginResponse.RecordNumber = user.Student.RecordNumber;
            }

            return Ok(loginResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error interno del servidor: " + ex.Message);
        }
    }
}