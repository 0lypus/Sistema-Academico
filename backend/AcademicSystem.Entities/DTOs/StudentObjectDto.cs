using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record StudentObjectRequestDto(
    [property: Required, StringLength(100)] string FirstName,
    [property: Required, StringLength(100)] string LastName,
    [property: Required, RegularExpression(@"^\d{11}$")] string Cuil,
    [property: Required, RegularExpression(@"^\d{7,8}$")] string Dni,
    [property: Required, StringLength(20)] string RecordNumber,
    [property: Required, EmailAddress, StringLength(255)] string Email,
    DateOnly? BirthDate,
    [property: StringLength(200)] string? Address,
    [property: StringLength(20)] string? Phone,
    [property: StringLength(20)] string? EmergencyContactPhone,
    [property: Required, MinLength(8)] string Password,
    [property: Range(1, int.MaxValue)] int RoleId,
    bool IsActive = true
);

public record StudentObjectUpdateRequestDto(
    [property: Required, StringLength(100)] string FirstName,
    [property: Required, StringLength(100)] string LastName,
    [property: Required, RegularExpression(@"^\d{11}$")] string Cuil,
    [property: Required, RegularExpression(@"^\d{7,8}$")] string Dni,
    [property: Required, StringLength(20)] string RecordNumber,
    [property: Required, EmailAddress, StringLength(255)] string Email,
    DateOnly? BirthDate,
    [property: StringLength(200)] string? Address,
    [property: StringLength(20)] string? Phone,
    [property: StringLength(20)] string? EmergencyContactPhone,
    bool IsActive
);

public record StudentObjectResponseDto(
    int Id,
    int UserId,
    int RoleId,
    string FirstName,
    string LastName,
    string Cuil,
    string Dni,
    string RecordNumber,
    string Email,
    DateOnly? BirthDate,
    string? Address,
    string? Phone,
    string? EmergencyContactPhone,
    bool IsActive
);
