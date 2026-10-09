using AcademicSystem.Data.Context;
using AcademicSystem.Business.Services;
using AcademicSystem.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AcademicSystem.Api.Controllers;

[ApiController]
[Route("api/roles")]
public class RolesController(AcademicSystemContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await context.Roles.AsNoTracking().OrderBy(x => x.Name).Select(x => new { x.Id, x.Name }).ToListAsync(ct));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var role = await context.Roles.AsNoTracking().Where(x => x.Id == id).Select(x => new { x.Id, x.Name }).SingleOrDefaultAsync(ct);
        return role is null ? NotFound() : Ok(role);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Role input, CancellationToken ct)
    {
        var name = input.Name?.Trim();
        if (string.IsNullOrWhiteSpace(name) || name.Length > 50) return BadRequest(new { message = "El nombre es obligatorio (máximo 50 caracteres)." });
        if (await context.Roles.AnyAsync(x => x.Name == name, ct)) return Conflict(new { message = "Ya existe un rol con ese nombre." });
        var role = new Role { Name = name };
        context.Roles.Add(role);
        await context.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(GetById), new { id = role.Id }, new { role.Id, role.Name });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Role input, CancellationToken ct)
    {
        var role = await context.Roles.SingleOrDefaultAsync(x => x.Id == id, ct);
        if (role is null) return NotFound();
        var name = input.Name?.Trim();
        if (string.IsNullOrWhiteSpace(name) || name.Length > 50) return BadRequest(new { message = "El nombre es obligatorio (máximo 50 caracteres)." });
        if (await context.Roles.AnyAsync(x => x.Id != id && x.Name == name, ct)) return Conflict(new { message = "Ya existe otro rol con ese nombre." });
        var hasMismatchedProfiles = await context.Users.AnyAsync(x => x.RoleId == id &&
            ((x.Student != null && name != RoleNames.Student) ||
             (x.AcademicSecretary != null && name != RoleNames.AcademicSecretary)), ct);
        if (hasMismatchedProfiles)
            return Conflict(new { message = "No se puede renombrar el rol porque dejaría perfiles asociados a un rol incompatible." });
        role.Name = name;
        await context.SaveChangesAsync(ct);
        return Ok(new { role.Id, role.Name });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var role = await context.Roles.SingleOrDefaultAsync(x => x.Id == id, ct);
        if (role is null) return NotFound();
        if (await context.Users.AnyAsync(x => x.RoleId == id, ct) || await context.RoleDocumentTypes.AnyAsync(x => x.RoleId == id, ct))
            return Conflict(new { message = "No se puede eliminar el rol porque tiene datos asociados." });
        context.Roles.Remove(role);
        await context.SaveChangesAsync(ct);
        return NoContent();
    }
}
