using AcademicSystem.Data.Context;
using AcademicSystem.Business.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AcademicSystem.Api.Controllers;

[ApiController]
[Route("api/roles")]
[Authorize(Roles = RoleNames.AcademicSecretary)]
public class RolesController(AcademicSystemContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await context.Roles.AsNoTracking().OrderBy(x => x.Name).Select(x => new { x.Id, x.Name }).ToListAsync(ct));

}
