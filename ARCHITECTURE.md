# 🏛️ Arquitectura del Sistema

## Índice
1. [Visión General](#visión-general)
2. [Domain-Driven Design (DDD)](#domain-driven-design-ddd)
3. [Clean Architecture](#clean-architecture)
4. [Patrón Adapter](#patrón-adapter)
5. [Flujo de Datos](#flujo-de-datos)
6. [Decisiones de Diseño](#decisiones-de-diseño)

---

## Visión General

Este proyecto implementa una **arquitectura empresarial** para garantizar:
- ✅ **Escalabilidad**: Fácil agregar nuevos dominios o features
- ✅ **Mantenibilidad**: Cada capa tiene una responsabilidad única
- ✅ **Testabilidad**: Cada capa se puede testear de forma aislada
- ✅ **Desacoplamiento**: El frontend no depende de la estructura del backend

### Principios Fundamentales

1. **Separation of Concerns** (SoC)
2. **Single Responsibility Principle** (SRP)
3. **Dependency Inversion Principle** (DIP)
4. **Open/Closed Principle** (OCP)

---

## Domain-Driven Design (DDD)

### ¿Por qué DDD?

El sistema se organizó por **dominios de negocio** en lugar de por tipo técnico (components, hooks, etc.). Esto permite que cada equipo trabaje en su dominio sin afectar a otros.

### Dominios Identificados

```
src/features/
├── auth/           → Autenticación y gestión de sesión
├── admin/          → Panel administrativo (vista global)
├── support/        → Gestión de tickets de soporte
└── client/         → Creación y seguimiento de tickets
```

Cada dominio es **autocontenido** y tiene su propia estructura interna.

### Estructura de un Dominio

```
domain/
├── entities/              # 📦 Modelos de negocio
│   └── User.ts           # interface User { ... }
│
├── adapters/             # 🔄 Transformación de datos
│   ├── user.adapter.ts   # API → Entity
│   └── user.adapter.test.ts
│
├── use-cases/            # 🎯 Lógica de negocio
│   ├── login.use-case.ts
│   └── login.use-case.test.ts
│
├── hooks/                # ⚛️ Estado React
│   ├── useLogin.ts
│   └── useLogin.test.ts
│
├── components/           # 🎨 UI Presentacional (Dumb)
│   └── LoginFormView.tsx
│
├── wrapper-components/   # 🧠 UI con Lógica (Smart)
│   └── LoginForm.tsx
│
└── index.ts              # 📤 Barrel export (API pública)
```

---

## Clean Architecture

### Capas y Dependencias

```
┌─────────────────────────────────────────┐
│         Components (UI Layer)           │ ← Interactúa con el usuario
├─────────────────────────────────────────┤
│       Hooks (Application Layer)         │ ← Maneja estado React
├─────────────────────────────────────────┤
│     Use Cases (Business Logic)          │ ← Reglas de negocio
├─────────────────────────────────────────┤
│       Adapters (Data Transform)         │ ← Transforma datos
├─────────────────────────────────────────┤
│        Entities (Domain Models)         │ ← Modelos puros
└─────────────────────────────────────────┘
```

**Regla de Oro**: Las dependencias **solo pueden fluir hacia abajo**.  
❌ Un Entity **NO** puede depender de un Hook.  
✅ Un Hook **SÍ** puede depender de un Use Case.

### Ventajas

1. **Independencia de Frameworks**: React puede ser reemplazado sin cambiar la lógica de negocio
2. **Testabilidad**: Cada capa se puede mockear
3. **Reusabilidad**: Los Use Cases pueden ser usados por múltiples componentes
4. **Mantenibilidad**: Cambios localizados (modificar un adapter no afecta componentes)

---

## Patrón Adapter

### ¿Qué problema resuelve?

**Problema**: La API devuelve datos en un formato que **NO** es óptimo para la UI.

Ejemplo real del proyecto:

```typescript
// ❌ Respuesta directa de la API
{
  "id": 1,
  "name": "John Doe",
  "email": "john@test.com",
  "password": "hashed_password",  // ⚠️ No queremos esto en el frontend
  "role": "client",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

**Solución**: Crear un Adapter que transforme y limpie los datos.

### Implementación

```typescript
// 1. Entity (Modelo de dominio)
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'support' | 'client';
  // ✅ Sin password, sin createdAt
}

// 2. Adapter (Transformación)
export const authAdapter = (apiData: any): User => {
  return {
    id: apiData.id,
    name: apiData.name,
    email: apiData.email,
    role: apiData.role,
    // 🛡️ Filtramos campos sensibles
  };
};

// 3. Use Case (Uso del adapter)
export const loginUseCase = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  const [userData] = await response.json();
  
  // 🔄 Transformamos antes de devolver
  return authAdapter(userData);
};
```

### Ventajas del Adapter

| Aspecto | Sin Adapter | Con Adapter |
|---------|-------------|-------------|
| **Cambios en API** | 💥 Rompe componentes | ✅ Solo modificas adapter |
| **Datos sensibles** | ⚠️ Expuestos en UI | 🛡️ Filtrados en adapter |
| **Testing** | 😓 Mocks complicados | ✅ Mocks simples |
| **TypeScript** | ❌ Tipos inconsistentes | ✅ Tipos garantizados |

---

## Flujo de Datos

### Ejemplo: Login de Usuario

```
┌──────────┐
│  USER    │ 1. Ingresa credenciales
│ (Browser)│
└────┬─────┘
     │
     ▼
┌──────────────────┐
│  LoginForm.tsx   │ 2. Wrapper component (Smart)
│  (Wrapper)       │    - Captura evento onSubmit
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│   useLogin.ts    │ 3. Hook
│   (Hook)         │    - Maneja estado (loading, error, user)
└────┬─────────────┘
     │
     ▼
┌─────────────────────┐
│ login.use-case.ts   │ 4. Use Case
│ (Business Logic)    │    - Hace fetch a la API
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│  auth.adapter.ts    │ 5. Adapter
│  (Data Transform)   │    - Transforma API → Entity
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│     User Entity     │ 6. Entity
│  (Domain Model)     │    - Modelo tipado
└────┬────────────────┘
     │
     ▼
┌──────────────────┐
│   useLogin.ts    │ 7. Actualiza estado
│   setUser(user)  │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│  LoginFormView   │ 8. Re-renderiza UI
│  (Dumb UI)       │    - Muestra usuario logueado
└──────────────────┘
```

---

## Decisiones de Diseño

### 1. ¿Por qué separar Components y Wrapper-Components?

**Components (Dumb/Presentational)**:
- Solo reciben props
- No tienen lógica de negocio
- Fáciles de testear (props in, UI out)
- Reutilizables

```tsx
// ✅ Componente Presentacional
export const LoginFormView = ({ onSubmit, isLoading, error }) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Solo renderiza UI */}
    </form>
  );
};
```

**Wrapper-Components (Smart/Container)**:
- Contienen lógica de negocio
- Usan hooks
- Orquestan componentes presentacionales

```tsx
// ✅ Componente Contenedor
export const LoginForm = () => {
  const { login, isLoading, error } = useLogin(); // ← Hook
  
  return <LoginFormView onSubmit={login} isLoading={isLoading} error={error} />;
};
```

### 2. ¿Por qué Zustand en lugar de Redux?

- ✅ **Simplicidad**: Menos boilerplate
- ✅ **Performance**: Solo re-renderiza componentes suscritos
- ✅ **TypeScript**: Tipado nativo sin complicaciones
- ✅ **Bundle size**: 1KB vs 10KB de Redux + Toolkit

### 3. ¿Por qué Barrel Files (index.ts)?

**Sin Barrel**:
```typescript
import { LoginForm } from '../features/auth/wrapper-components/LoginForm/src/LoginForm';
import { User } from '../features/auth/entities/User';
```

**Con Barrel**:
```typescript
import { LoginForm, User } from '../features/auth';
```

Ventajas:
- ✅ Imports más limpios
- ✅ Encapsulación (solo exportas la API pública)
- ✅ Refactoring más fácil (cambios internos no afectan imports)

### 4. ¿Por qué Testing por Capas?

```
📦 Adapter Test → Mock de API Response
📦 Use Case Test → Mock de fetch global
📦 Hook Test → Mock de Use Cases
📦 Component Test → Mock de Hooks
```

**Ventaja**: Si un test falla, sabes **exactamente** qué capa está rota.

---

## Escalabilidad

### Agregar un Nuevo Dominio

```bash
# 1. Crear estructura
mkdir -p src/features/nuevo-dominio/{entities,adapters,use-cases,hooks,components,wrapper-components}

# 2. Definir entidad
# src/features/nuevo-dominio/entities/MiEntidad.ts

# 3. Crear adapter
# src/features/nuevo-dominio/adapters/mi.adapter.ts

# 4. Implementar use case
# src/features/nuevo-dominio/use-cases/miAccion.use-case.ts

# 5. Crear hook
# src/features/nuevo-dominio/hooks/useMiFeature.ts

# 6. Desarrollar UI
# src/features/nuevo-dominio/components/...

# 7. Exportar API pública
# src/features/nuevo-dominio/index.ts
```

**Sin afectar otros dominios** ✅

---

## Métricas de Calidad

| Métrica | Valor | Objetivo |
|---------|-------|----------|
| **Tests** | 56 ✅ | > 50 |
| **Cobertura** | ~80% | > 70% |
| **Líneas por archivo** | < 200 | < 250 |
| **Acoplamiento** | Bajo ✅ | Bajo |
| **Cohesión** | Alta ✅ | Alta |

---

## Recursos Adicionales

- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/ddd/)
- [Adapter Pattern](https://refactoring.guru/design-patterns/adapter)

---

**Mantenido por**: Fernando Rodríguez  
**Última actualización**: 2025-01
