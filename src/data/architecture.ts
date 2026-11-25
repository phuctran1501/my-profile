export interface ArchitectureHub {
  id: number;
  code: string;
  label: string;
  file: string;
  codeSnippet: string;
}

export const ARCHITECTURE_HUBS: ArchitectureHub[] = [
  {
    id: 0,
    code: '01',
    label: 'EDGE',
    file: 'apiClient.ts',
    codeSnippet:
      'export const api = axios.create({ baseURL: "https://api.phuctran.dev/v1", timeout: 5000 });',
  },
  {
    id: 1,
    code: '02',
    label: 'JWT AUTH',
    file: 'JwtMiddleware.cs',
    codeSnippet:
      'if (jwt.TryValidate(ctx.Request, out var user)) ctx.User = user; await _next(ctx); // Zero DB hit',
  },
  {
    id: 2,
    code: '03',
    label: 'MEDIATR CQRS',
    file: 'SolveScheduleHandler.cs',
    codeSnippet:
      'var cached = await _redis.GetAsync<Schedule>(cmd.Key, ct); return cached ?? await _csp.SolveAsync(cmd, ct);',
  },
  {
    id: 3,
    code: '04',
    label: 'DOMAIN CSP',
    file: 'CspSolverEngine.cs',
    codeSnippet:
      'var next = courses.OrderBy(c => dom.Count(c)).First(); // MRV Heuristic & Forward Checking',
  },
  {
    id: 4,
    code: '05',
    label: 'POSTGRES / REDIS',
    file: 'ApplicationDbContext.cs',
    codeSnippet:
      'builder.Entity<Course>().HasIndex(c => new { c.SemId, c.SlotId }).HasMethod("gin"); // <5ms lookup',
  },
];
