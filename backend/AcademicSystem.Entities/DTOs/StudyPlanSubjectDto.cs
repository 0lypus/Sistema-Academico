using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record StudyPlanSubjectRequestDto(
    [property: Range(1, int.MaxValue)] int StudyPlanId,
    [property: Range(1, int.MaxValue)] int SubjectId,
    [property: Range(1, 10)] int CourseYear,
    [property: Range(1, 2)] byte? Term
);

public record StudyPlanSubjectUpdateRequestDto(
    [property: Range(1, 10)] int CourseYear,
    [property: Range(1, 2)] byte? Term
);

public record StudyPlanSubjectResponseDto(
    int Id,
    int StudyPlanId,
    int SubjectId,
    int CourseYear,
    byte? Term
);
