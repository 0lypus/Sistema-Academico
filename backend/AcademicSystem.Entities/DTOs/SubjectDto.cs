using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record SubjectRequestDto(
    [property: Required, StringLength(150)] string Name,
    [property: Range(1, int.MaxValue)] int? OrderNumber,
    [StringLength(50)] string? Format,
    [property: Range(0, int.MaxValue)] int? LectureHours,
    [property: Range(0, int.MaxValue)] int? TotalHours,
    [StringLength(50)] string? Course
);

public record SubjectUpdateRequestDto(
    [property: Required, StringLength(150)] string Name,
    [property: Range(1, int.MaxValue)] int? OrderNumber,
    [StringLength(50)] string? Format,
    [property: Range(0, int.MaxValue)] int? LectureHours,
    [property: Range(0, int.MaxValue)] int? TotalHours,
    [StringLength(50)] string? Course
);

public record SubjectResponseDto(
    int Id,
    string Name,
    int? OrderNumber,
    string? Format,
    int? LectureHours,
    int? TotalHours,
    string? Course
);
