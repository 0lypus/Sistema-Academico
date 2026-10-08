using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record StudentSubjectRequestDto(
    [property: Range(1, int.MaxValue)] int StudentId,
    [property: Range(1, int.MaxValue)] int SubjectId,
    [property: Required, StringLength(20)] string Section
);

public record StudentSubjectUpdateRequestDto(
    [property: Required, StringLength(20)] string Section
);

public record StudentSubjectResponseDto(
    int Id,
    int StudentId,
    int SubjectId,
    string Section
);
