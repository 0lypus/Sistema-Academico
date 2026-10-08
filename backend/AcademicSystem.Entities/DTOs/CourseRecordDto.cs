using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record CourseRecordRequestDto(
    [property: Range(1, int.MaxValue)] int StudentSubjectId,
    [property: Range(0, 100)] decimal? AttendancePercentage,
    [property: Range(0, 10)] decimal? NumericGrade,
    [StringLength(20)] string? LetterGrade,
    [StringLength(30)] string? FinalStatus,
    [StringLength(1000)] string? Observations
);

public record CourseRecordUpdateRequestDto(
    [property: Range(0, 100)] decimal? AttendancePercentage,
    [property: Range(0, 10)] decimal? NumericGrade,
    [StringLength(20)] string? LetterGrade,
    [StringLength(30)] string? FinalStatus,
    [StringLength(1000)] string? Observations
);

public record CourseRecordResponseDto(
    int Id,
    int StudentSubjectId,
    decimal? AttendancePercentage,
    decimal? NumericGrade,
    string? LetterGrade,
    string? FinalStatus,
    string? Observations,
    DateTime UpdatedAt
);
