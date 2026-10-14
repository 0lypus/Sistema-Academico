using AcademicSystem.Entities.DTOs;

namespace AcademicSystem.Business.Services;

public interface ISubjectService
{
    Task<AvailableSubjectsResponseDto> GetAvailableAsync(CancellationToken cancellationToken = default);
}
