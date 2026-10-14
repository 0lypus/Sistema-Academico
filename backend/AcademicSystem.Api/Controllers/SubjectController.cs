using AcademicSystem.Business.Services;
using AcademicSystem.Entities.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace AcademicSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubjectController(ISubjectService subjectService) : ControllerBase
{
	[HttpGet("available")]
    //materias disponibles
	public async Task<ActionResult<AvailableSubjectsResponseDto>> GetAvailable(CancellationToken cancellationToken)
	{
		try
		{
			var result = await subjectService.GetAvailableAsync(cancellationToken);

			if (result is null || result.Subjects is null)
			{
				return StatusCode(500, "No hay materias disponibles");
			}

			if (result.Subjects.Count == 0)
			{
				return NotFound(result);
			}

			return Ok(result);
		}
		catch (Exception)
		{
			return StatusCode(500, "Error al consultar las materias disponibles.");
		}
	}
}