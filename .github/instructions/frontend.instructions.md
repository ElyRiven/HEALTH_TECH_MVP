---
description: "Use when creating or modifying frontend files: React components, hooks, pages, or utilities in HEALTH_TECH_FRONTEND. Covers TypeScript patterns, Tailwind CSS, shadcn/ui, hooks structure, and API data fetching."
applyTo: "HEALTH_TECH_FRONTEND/src/**/*.{ts,tsx}"
---

# Frontend Conventions (React 19 + TypeScript + Tailwind CSS 4)

## Estructura de carpetas
```
pages/       → Una página por ruta (Dashboard.tsx, Register.tsx, RegisterVitals.tsx)
components/  → Componentes reutilizables en PascalCase.tsx
  ui/        → Primitivos de shadcn/ui (Button, Table, etc.) — no modificar
hooks/       → Custom hooks en carpetas: useHookName/
  useHookName.ts   → Lógica del hook
  types.ts         → Interfaces TypeScript del hook
  data.ts          → Constantes / datos iniciales
config/      → api.ts con API_BASE_URL y constantes globales
lib/         → Utilidades puras (cn(), utils.ts)
```

## Componentes
- Siempre componentes funcionales con TypeScript
- Un componente complejo → carpeta propia con `ComponentName.tsx` + `types.ts`
- Exportar con `export default` para páginas, `export` nombrado para componentes reutilizables
- Importar tipos con `import type { ... }`

```tsx
// Componente simple
interface Props {
  label: string;
  variant?: 'success' | 'error';
}

export function ResponseAlert({ label, variant = 'success' }: Props) {
  return <div className={cn('rounded p-2', variant === 'error' && 'bg-red-100')}>{label}</div>;
}
```

## Custom Hooks
- Nombre: `useCamelCase` en archivo `useHookName.ts` dentro de `hooks/useHookName/`
- Incluir `types.ts` en la misma carpeta para las interfaces
- Usar la Fetch API (no axios) con manejo de errores explícito
- Devolver estado + funciones: `{ data, isLoading, error, submit }`

```typescript
// hooks/useGetListPacients/useGetListPacients.ts
export function useGetListPacients() {
  const [pacients, setPacients] = useState<Pacient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // ...
  return { pacients, isLoading };
}
```

## Tailwind CSS
- Usar utilidades de Tailwind; evitar CSS custom salvo en `App.css` para variables globales
- Combinar clases condicionales con `cn()` de `lib/utils.ts` (wrapper de `clsx` + `tailwind-merge`)
- Colores de la paleta del proyecto: `blue-medium-tittle`, `main-white-back`, `light-blue`

```tsx
import { cn } from '@/lib/utils';
<div className={cn('base-classes', isActive && 'active-class')} />
```

## Alias de importación
- Usar `@/` para importar desde `src/`: `import { cn } from '@/lib/utils'`
- Nunca usar rutas relativas largas (`../../../lib/utils`)

## API
- URL base desde `API_BASE_URL` en `@/config/api.ts`
- Los endpoints siguen el patrón `/api/v1/pacients` y `/api/v1/vitals/:patientId`
- Manejar respuestas de error con el formato: `{ message: string, errors?: Record<string, string> }`

## Mapeo de criticidad (backend → UI)
```typescript
// Los valores numéricos del backend se mapean en los hooks
const CRITICIDAD_LABELS: Record<number, string> = {
  1: 'Emergencia inmediata',  // rojo
  2: 'Muy urgente',           // naranja
  3: 'Urgente',               // amarillo
  4: 'Menos urgente',         // verde
  5: 'No urgente',            // azul
};
```

## shadcn/ui
- Usar los componentes de `@/components/ui/` (Button, Table, Input, etc.)
- No modificar los archivos en `components/ui/` directamente
- Instalar nuevos componentes con: `npx shadcn add <component>`

## TypeScript
- Modo strict habilitado; no usar `any`
- Definir interfaces en `types.ts` junto al componente o hook que las usa
- Usar `type` para uniones/intersecciones y `interface` para formas de objetos
