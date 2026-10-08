using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record PrerequisiteRequestDto(
    [property: Range(1, int.MaxValue)] int StudyPlanId,
    [property: Range(1, int.MaxValue)] int SubjectId,
    [property: Range(1, int.MaxValue)] int PrerequisiteSubjectId
);

public record PrerequisiteUpdateRequestDto(
    [property: Range(1, int.MaxValue)] int StudyPlanId,
    [property: Range(1, int.MaxValue)] int SubjectId,
    [property: Range(1, int.MaxValue)] int PrerequisiteSubjectId
);

public record PrerequisiteResponseDto(
    int Id,
    int StudyPlanId,
    int SubjectId,
    int PrerequisiteSubjectId
);
