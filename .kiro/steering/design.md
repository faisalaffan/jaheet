# Jaheet — Design & Conventions

## Backend Conventions

### Handler Pattern
Every handler receives a service, not a DB pool. Handlers only do:
1. Parse request (URL params, JSON body)
2. Call service method
3. Return JSON response or error

```go
type XHandler struct{ svc *service.XService }

func (h *XHandler) Routes() chi.Router {
    r := chi.NewRouter()
    r.Get("/", h.List)
    r.Post("/", h.Create)
    r.Get("/{id}", h.Get)
    r.Put("/{id}", h.Update)
    r.Delete("/{id}", h.Delete)
    return r
}
```

### Service Pattern
Services contain business logic and validation. They receive repository interfaces.

```go
type XService struct{ repo repository.XRepository }
```

### Repository Pattern
Interfaces defined in `internal/repository/interfaces.go`. Implementations in `internal/repository/postgres/`.

### JSON Helpers
Use `handler.JSON()`, `handler.Error()`, `handler.Decode()` from `internal/handler/json.go`.

### Database
- Use `pgxpool.Pool` for connection pooling
- Use parameterized queries (`$1`, `$2`, etc.)
- Use transactions for multi-table operations
- Use `RETURNING` clause to populate structs after INSERT/UPDATE
- All monetary values: `numeric(15,2)` in DB, `float64` in Go
- All IDs: UUID with `gen_random_uuid()` default
- All timestamps: `timestamptz` with `now()` default

### Error Handling
- Validation errors → 400 Bad Request
- Not found → 404 Not Found
- Server errors → 500 Internal Server Error
- Return `error` from service/repo, handler maps to HTTP status

## Frontend Conventions

### Data Fetching
Use TanStack React Query for all API calls:
```tsx
const { data, isLoading } = useQuery<Type[]>({
    queryKey: ['entity-name'],
    queryFn: () => api.get('/endpoint').then(r => r.data),
})
```

### Mutations
```tsx
const mutation = useMutation({
    mutationFn: (data) => api.post('/endpoint', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entity-name'] }),
})
```

### UI Components
Use shadcn/ui components. Import from `@/components/ui/`.

### Styling
Tailwind CSS only. No inline styles. No CSS modules.

### API Client
Use `@/lib/api.ts` (Axios instance with `/api/v1` baseURL and proxy in vite config).

### Types
All TypeScript types in `@/types/index.ts`, mirroring backend domain entities.

## API Design

### URL Pattern
- `GET /api/v1/{resource}` — List
- `POST /api/v1/{resource}` — Create
- `GET /api/v1/{resource}/{id}` — Get by ID
- `PUT /api/v1/{resource}/{id}` — Update
- `DELETE /api/v1/{resource}/{id}` — Delete
- `POST /api/v1/{resource}/{id}/{action}` — State transitions (confirm, cancel, advance)

### Response Format
- Success: JSON body with entity or array
- Error: `{"error": "message"}`
- Delete: 204 No Content
- Create: 201 Created

## Database Migration

Use Atlas HCL declarative schema in `backend/schema.hcl`.
- Apply: `atlas schema apply --env local`
- Diff: `atlas schema diff --env local`
- Config: `backend/atlas.hcl`
