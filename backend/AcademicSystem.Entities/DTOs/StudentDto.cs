using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record StudentRequestDto(
    [property: Range(1, int.MaxValue)] int UserId,
    [property: Required, StringLength(100)] string FirstName,
    [property: Required, StringLength(100)] string LastName,
    [property: Required, RegularExpression(@"^\d{7,8}$")] string Dni,
    [property: Required, StringLength(20)] string RecordNumber
);

public record StudentUpdateRequestDto(
    [property: Required, StringLength(100)] string FirstName,
    [property: Required, StringLength(100)] string LastName,
    [property: Required, RegularExpression(@"^\d{7,8}$")] string Dni,
    [property: Required, StringLength(20)] string RecordNumber
);

public record StudentResponseDto(
    int Id,
    int UserId,
    string FirstName,
    string LastName,
    string Dni,
    string RecordNumber
);
