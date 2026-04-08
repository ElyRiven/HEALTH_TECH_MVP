---
description: "Use when writing, fixing, or reviewing tests: unit tests, integration tests for backend (Jest) or frontend (Vitest + Testing Library). Covers mock patterns, test structure, and coverage requirements."
---

# Testing Conventions

## Backend — Jest (HEALTH_TECH_BACKEND/tests/)

### Estructura
```
tests/
  unit/         → Pruebas de controllers, helpers, TriageEngine en aislamiento
  integration/  → Pruebas HTTP end-to-end con supertest (sin levantar servidor real)
```

### Mocks
- Usar `jest.mock()` con factory function para evitar problemas de hoisting:
```javascript
jest.mock('../../../src/db.js', () => ({
  pool: { query: jest.fn() },
}));
jest.mock('../../../src/helpers/TriageEngine.js', () => ({
  classifyTriage: jest.fn().mockReturnValue({ criticidadLevel: 3 }),
}));
```
- Nunca usar importaciones reales de `db.js` en tests unitarios
- Resetear mocks entre pruebas con `jest.clearAllMocks()` en `beforeEach`

### Tests de integración (supertest)
```javascript
import request from 'supertest';
import { createApp } from '../../src/app.js'; // app sin .listen()

describe('POST /api/v1/pacients', () => {
  it('returns 201 with valid data', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ identificacion: 12345678 }] });
    const res = await request(app).post('/api/v1/pacients').send({ /* payload */ });
    expect(res.status).toBe(201);
  });
});
```

### Cobertura mínima
75% en branches, functions, lines y statements. Configurado en `package.json`.

---

## Frontend — Vitest + Testing Library (HEALTH_TECH_FRONTEND/src/test/)

### Estructura
```
src/test/
  setup.ts     → Configuración global (mocks de window.scrollTo, cleanup)
  unit/        → Tests de componentes, hooks, utilidades
```

### Tests de componentes
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PatientForm } from '@/components/PatientForm/PatientForm';

it('shows validation error when identificacion is empty', async () => {
  render(<PatientForm />);
  await userEvent.click(screen.getByRole('button', { name: /registrar/i }));
  expect(screen.getByText(/identificación requerida/i)).toBeInTheDocument();
});
```

### Tests de hooks
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useGetListPacients } from '@/hooks/useGetListPacients/useGetListPacients';

it('fetches patient list on mount', async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => [] });
  const { result } = renderHook(() => useGetListPacients());
  await waitFor(() => expect(result.current.isLoading).toBe(false));
});
```

### Convenciones
- Siempre mockear `fetch` con `vi.fn()` en tests que llaman a la API
- No testear detalles de implementación; testear comportamiento observable
- Nombres de prueba en español si describen un caso de negocio
- Path alias `@/` disponible en tests (resuelve a `src/`)

### Cobertura mínima
75% en branches, functions, lines y statements (igual que backend).
