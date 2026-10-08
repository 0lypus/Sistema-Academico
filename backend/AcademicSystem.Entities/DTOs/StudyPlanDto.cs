using System.ComponentModel.DataAnnotations;

namespace AcademicSystem.Entities.DTOs;

public record StudyPlanRequestDto(
    [property: Required, StringLength(150)] string Name,
    [property: Required, StringLength(30)] string PlanCode,
    [property: Range(1, int.MaxValue)] int? CareerDurationYears,
    [StringLength(50)] string? AttendanceMode,
    [property: Range(0, int.MaxValue)] int? TotalWorkloadHours,
    int StartYear,
    int? EndYear,
    bool IsActive = true
);

public record StudyPlanUpdateRequestDto(
    [property: Required, StringLength(150)] string Name,
    [property: Required, StringLength(30)] string PlanCode,
    [property: Range(1, int.MaxValue)] int? CareerDurationYears,
    [StringLength(50)] string? AttendanceMode,
    [property: Range(0, int.MaxValue)] int? TotalWorkloadHours,
    int StartYear,
    int? EndYear,
    bool IsActive
);

public record StudyPlanResponseDto(
    int Id,
    string Name,
    string PlanCode,
    int? CareerDurationYears,
    string? AttendanceMode,
    int? TotalWorkloadHours,
    int StartYear,
    int? EndYear,
    bool IsActive
);
