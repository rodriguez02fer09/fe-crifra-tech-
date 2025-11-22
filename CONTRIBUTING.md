# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a mantener los estándares de calidad del código.

---

## 📋 Tabla de Contenidos

- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Commits](#estándares-de-commits)
- [Reglas de Código](#reglas-de-código)
- [Testing](#testing)
- [Pull Requests](#pull-requests)

---

## Flujo de Trabajo

### 1. Crear una Rama

Usamos **Git Flow** simplificado con las siguientes convenciones:

```bash
# Features (nuevas funcionalidades)
git checkout -b feature/nombre-descripción

# Bugfixes (corrección de errores)
git checkout -b fix/nombre-descripción

# Mejoras de rendimiento
git checkout -b perf/nombre-descripción

# Refactoring
git checkout -b refactor/nombre-descripción

# Documentación
git checkout -b docs/nombre-descripción
```

**Ejemplos**:
```bash
git checkout -b feature/add-ticket-assignation
git checkout -b fix/login-redirect-bug
git checkout -b refactor/auth-domain-structure
```

### 2. Hacer Commits

Este proyecto usa **Husky** y **Commitlint** para forzar commits con formato estandarizado.

#### ⚠️ IMPORTANTE: Conventional Commits

Todos los commits **DEBEN** seguir el formato:

```
<type>(<scope>): <subject>

<body> (opcional)

<footer> (opcional)
```

Si tu commit no cumple este formato, **Husky lo rechazará automáticamente**.

---

## Estándares de Commits

### Tipos Permitidos

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(auth): add forgot password feature` |
| `fix` | Corrección de bug | `fix(tickets): resolve pagination issue` |
| `docs` | Cambios en documentación | `docs(readme): update installation steps` |
| `style` | Formateo, espacios, etc. | `style(login): format code with prettier` |
| `refactor` | Refactorización sin cambio funcional | `refactor(admin): extract stats calculation` |
| `perf` | Mejoras de rendimiento | `perf(dashboard): optimize ticket filtering` |
| `test` | Agregar o modificar tests | `test(auth): add useLogin hook tests` |
| `chore` | Tareas de mantenimiento | `chore(deps): update dependencies` |

### Scopes (Ámbitos)

Usa el dominio o área afectada:

- `auth` - Autenticación
- `admin` - Panel Admin
- `support` - Panel Soporte
- `client` - Panel Cliente
- `ui` - Componentes UI
- `api` - Servicios de API
- `router` - Rutas
- `store` - Estado global

### Formato del Subject

- ✅ Usar imperativo: "add" no "added" ni "adds"
- ✅ No capitalizar la primera letra
- ✅ No punto final (.)
- ✅ Máximo 72 caracteres

### Ejemplos Completos

```bash
# ✅ CORRECTO
git commit -m "feat(auth): add login with Google OAuth"
git commit -m "fix(tickets): prevent duplicate submission on double click"
git commit -m "refactor(admin): extract chart logic into custom hook"
git commit -m "test(support): add integration tests for ticket assignment"

# ❌ INCORRECTO
git commit -m "Added new feature"           # Sin tipo ni scope
git commit -m "Fix bug"                     # Demasiado vago
git commit -m "feat(auth) added login"      # Sin ":" y en pasado
git commit -m "Feat(Auth): Add feature."    # Capitalizado y con punto
```

### Commits con Body

Para cambios más complejos:

```bash
git commit -m "feat(admin): add advanced ticket filtering

Implements multi-select filters for:
- Status (pending, in_progress, resolved)
- Priority (low, medium, high)
- Date range (custom date picker)

Closes #42"
```

### Breaking Changes

Si introduces un cambio que rompe compatibilidad:

```bash
git commit -m "feat(api)!: change ticket API response structure

BREAKING CHANGE: The API now returns pagination metadata
under 'meta' instead of at root level.

Migration guide: Update all fetch calls to access data.meta.total
instead of data.total
```

---

## Reglas de Código

### ESLint

El proyecto tiene ESLint configurado para mantener calidad de código.

```bash
# Verificar linting
npm run lint

# Auto-fix problemas
npm run lint:fix
```

#### Reglas Principales

- ✅ **No `any` sin justificación**: Usar tipos específicos
- ✅ **Imports ordenados**: Automático con Prettier
- ✅ **Variables no usadas**: ESLint las marcará
- ✅ **Console logs**: Prohibidos en producción (excepto en dev mode)

### Prettier

Formateo automático de código.

```bash
# Formatear archivos
npm run format

# Verificar formato
npm run format:check
```

**Configuración** (`.prettierrc.json`):
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### TypeScript

- ✅ **Strict mode** habilitado
- ✅ **Tipos explícitos** en parámetros de funciones
- ✅ **Interfaces** sobre types (cuando sea posible)
- ✅ **Props** tipadas en componentes React

Ejemplo:

```typescript
// ✅ CORRECTO
interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  // ...
};

// ❌ INCORRECTO
export const LoginForm = ({ onSubmit, isLoading }: any) => {
  // ...
};
```

---

## Testing

### ⚠️ Regla Obligatoria

**Toda nueva funcionalidad DEBE tener tests**.

### Estrategia de Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Niveles de Testing

#### 1. Unit Tests (Adapters, Use Cases)

```typescript
// ✅ Ejemplo: Adapter Test
import { describe, it, expect } from 'vitest';
import { authAdapter } from './auth.adapter';

describe('authAdapter', () => {
  it('should transform API data to User entity', () => {
    const apiData = {
      id: 1,
      name: 'John',
      email: 'john@test.com',
      role: 'client',
      password: 'secret123',
    };

    const user = authAdapter(apiData);

    expect(user).toEqual({
      id: 1,
      name: 'John',
      email: 'john@test.com',
      role: 'client',
    });
    expect(user).not.toHaveProperty('password');
  });
});
```

#### 2. Integration Tests (Hooks)

```typescript
// ✅ Ejemplo: Hook Test
import { renderHook, act } from '@testing-library/react';
import { useLogin } from './useLogin';
import * as LoginUseCase from '../use-cases/login.use-case';

vi.mock('../use-cases/login.use-case');

describe('useLogin', () => {
  it('should update user state on successful login', async () => {
    const mockUser = { id: 1, name: 'John', email: 'john@test.com', role: 'client' };
    vi.spyOn(LoginUseCase, 'loginUseCase').mockResolvedValue(mockUser);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login('john@test.com', 'password');
    });

    expect(result.current.user).toEqual(mockUser);
  });
});
```

#### 3. Component Tests

```typescript
// ✅ Ejemplo: Component Test
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginFormView } from './LoginFormView';

describe('LoginFormView', () => {
  it('should call onSubmit with form data', () => {
    const mockOnSubmit = vi.fn();
    render(<LoginFormView onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith('test@test.com', expect.any(String));
  });
});
```

### Cobertura Mínima

- **Adapters**: 100% (son funciones puras)
- **Use Cases**: 90%
- **Hooks**: 80%
- **Components**: 70%

---

## Pull Requests

### Antes de Crear un PR

Checklist obligatorio:

- [ ] ✅ Tests agregados y pasando (`npm run test`)
- [ ] ✅ Linting sin errores (`npm run lint`)
- [ ] ✅ Código formateado (`npm run format`)
- [ ] ✅ Build de producción exitoso (`npm run build`)
- [ ] ✅ Commits siguen Conventional Commits
- [ ] ✅ Rama actualizada con `main` (`git pull origin main`)

### Crear el PR

1. **Título**: Usar formato de commit

```
feat(auth): add two-factor authentication
```

2. **Descripción**: Usar template

```markdown
## Descripción
Agrega autenticación de dos factores (2FA) para usuarios admin y soporte.

## Tipo de cambio
- [x] Nueva funcionalidad (feature)
- [ ] Corrección de bug (fix)
- [ ] Mejora de rendimiento (perf)

## ¿Cómo se ha probado?
- [x] Tests unitarios
- [x] Tests de integración
- [x] Pruebas manuales en Chrome/Firefox

## Checklist
- [x] Mi código sigue los estándares del proyecto
- [x] He agregado tests que prueban mi cambio
- [x] Todos los tests nuevos y existentes pasan
- [x] He actualizado la documentación si es necesario

## Screenshots (si aplica)
![image](https://...)
```

3. **Reviewers**: Asignar al menos 1 reviewer

### Proceso de Review

El reviewer verificará:

- ✅ Código cumple estándares
- ✅ Tests cubren casos edge
- ✅ No hay código duplicado
- ✅ Nombres de variables descriptivos
- ✅ Documentación actualizada

---

## Husky Hooks Activos

Este proyecto tiene los siguientes hooks configurados:

### Pre-commit

Se ejecuta **antes** de crear el commit:

```bash
# 1. ESLint check
# 2. Prettier check
# 3. TypeScript compilation check
```

Si alguno falla, el commit es **rechazado**.

### Commit-msg

Valida el formato del mensaje de commit:

```bash
# Valida que siga Conventional Commits
# Si no cumple, muestra error y rechaza
```

### Pre-push (Opcional)

Antes de hacer `git push`:

```bash
# Ejecuta todos los tests
# Si alguno falla, el push es bloqueado
```

---

## Estructura de un Nuevo Feature

Al agregar un nuevo feature, sigue esta estructura:

```
src/features/nuevo-feature/
├── entities/
│   ├── MiEntidad.ts
│   └── index.ts
├── adapters/
│   ├── mi.adapter.ts
│   └── mi.adapter.test.ts
├── use-cases/
│   ├── miAccion.use-case.ts
│   └── miAccion.use-case.test.ts
├── hooks/
│   ├── useMiFeature.ts
│   └── useMiFeature.test.ts
├── components/
│   ├── MiComponente.tsx
│   └── __tests__/
│       └── MiComponente.test.tsx
├── wrapper-components/
│   └── MiContenedor.tsx
└── index.ts (barrel file)
```

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia dev server
npm run server       # Inicia Mock API

# Calidad de Código
npm run lint         # Verifica linting
npm run lint:fix     # Auto-fix linting
npm run format       # Formatea código
npm run type-check   # Verifica TypeScript

# Testing
npm run test         # Ejecuta tests
npm run test:watch   # Tests en modo watch
npm run test:ui      # UI de Vitest
npm run test:coverage # Reporte de cobertura

# Build
npm run build        # Build de producción
npm run preview      # Preview del build
```

---

## Preguntas Frecuentes

### ¿Por qué mis commits son rechazados?

Probablemente no siguen el formato Conventional Commits. Ejemplos:

```bash
# ❌ Rechazado
git commit -m "fixed bug"

# ✅ Aceptado
git commit -m "fix(auth): resolve login redirect issue"
```

### ¿Cómo desactivo temporalmente Husky?

```bash
# NO RECOMENDADO, solo para emergencias
HUSKY=0 git commit -m "..."
```

### ¿Dónde reporto bugs?

Abre un issue en GitHub con el template de bug report.

### ¿Puedo usar `any` en TypeScript?

Solo en casos **muy** justificados:
- APIs externas sin tipos
- Migraciones de JavaScript legacy

**Siempre** agrega un comentario explicando por qué:

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = externalLib.getData(); // External lib without types
```

---

## Recursos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

---

**¡Gracias por contribuir!** 🎉

Si tienes dudas, abre un issue o contacta al equipo.
