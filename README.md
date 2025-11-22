# 🎫 Sistema de Gestión de Tickets - FE Cifra Tech

> **Prueba Técnica Frontend** | React + TypeScript + DDD + Clean Architecture

Un sistema profesional de gestión de tickets (solicitudes) con arquitectura empresarial, implementando Domain-Driven Design y Clean Architecture. Diseñado para demostrar habilidades senior en desarrollo frontend.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-56%20passing-success)](https://vitest.dev/)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demo & Credenciales](#-demo--credenciales)
- [Instalación](#-instalación-rápida)
- [Arquitectura](#-arquitectura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## ✨ Características

### ✅ Funcionalidades Principales (Requerimientos Cumplidos)

#### 🔐 Autenticación & Seguridad
- ✅ **Login simulado** contra API REST (json-server)
- ✅ **Protección de rutas** con Guards según rol de usuario
- ✅ **Persistencia de sesión** mediante `sessionStorage`
- ✅ **Redirección automática** basada en rol (Admin/Support/Client)

#### 👤 Módulo Cliente
- ✅ **Creación de tickets** con formulario validado
  - Validación en tiempo real de campos
  - Categorías: Autenticación, Pagos, Facturación, Técnico, Consultas, Configuración
  - Niveles de prioridad: Baja, Media, Alta
- ✅ **Historial de tickets propios** con paginación
- ✅ **Indicadores visuales de estado**:
  - 🟡 Pendiente
  - 🔵 En Proceso
  - 🟢 Resuelto
- ✅ **Vista detallada** de cada ticket con respuesta del equipo de soporte

#### 🎧 Módulo Soporte
- ✅ **Bandeja de tickets asignados** al agente
- ✅ **Filtrado por prioridad** (Alta, Media, Baja)
- ✅ **Gestión de tickets**:
  - Cambio de estado (Pendiente → En Proceso → Resuelto)
  - Redacción de respuestas para el cliente
  - Actualización en tiempo real
- ✅ **Exclusión automática** de tickets ya resueltos
- ✅ **Dashboard con estadísticas**:
  - Total de tickets asignados
  - Tickets pendientes
  - Tickets en proceso

#### 👔 Módulo Administrador
- ✅ **Vista completa tipo "God Mode"** de todos los tickets del sistema
- ✅ **Dashboard con KPIs** calculados en frontend:
  - Total de tickets
  - Pendientes
  - En proceso
  - Resueltos
- ✅ **Gráficas analíticas**:
  - Distribución por estado (Chart.js)
  - Distribución por prioridad
  - Distribución por categoría
- ✅ **Tabla avanzada** con paginación y datos de usuario expandidos
- ✅ **Navegación por pestañas**: Resumen General / Gestión de Tickets

---

### 🚀 Valor Agregado (Bonus - No Solicitado)

> **¿Por qué este proyecto demuestra seniority?** Implementé las siguientes mejoras profesionales no requeridas:

#### 🏗️ Arquitectura Profesional
- ✅ **Domain-Driven Design (DDD)** completo
  - Separación por dominios de negocio: `auth`, `admin`, `client`, `support`
  - Cada dominio es autocontenido y escalable
- ✅ **Clean Architecture** con capas bien definidas:
  ```
  Entities → Adapters → Use Cases → Hooks → Components → Wrappers
  ```
- ✅ **Patrón Adapter** en toda la aplicación
  - Capa de transformación API → Entidades de dominio
  - Protección contra cambios en el backend
  - Ejemplo: `authAdapter`, `ticketAdapter`, `adminTicketAdapter`

#### 🧪 Estrategia de Testing Sólida
- ✅ **56 tests automatizados** distribuidos en:
  - **Unit Tests**: Adapters, Use Cases
  - **Integration Tests**: Hooks con React Testing Library
  - **Component Tests**: Componentes UI
- ✅ **Cobertura por dominio**:
  - Auth: 31 tests
  - Support: 16 tests
  - Client: 5 tests
  - Admin: 4 tests
- ✅ **Configuración lista para CI/CD** con Vitest

#### 🎨 UI/UX Mejorada
- ✅ **Sistema de notificaciones** (Toast) para feedback al usuario
  - Confirmaciones de éxito
  - Mensajes de error amigables
  - Advertencias contextuales
- ✅ **Estados de carga** profesionales
  - Spinners durante peticiones
  - Skeleton screens (preparado)
  - Delay de 500ms en Mock API para testing realista
- ✅ **Paginación** en todas las listas largas
- ✅ **Diseño responsivo** mobile-first

#### 👨‍💻 Developer Experience (DX)
- ✅ **Husky + Commitlint** configurado
  - Commits obligatorios en formato Conventional Commits
  - Pre-commit hooks para linting
- ✅ **ESLint + Prettier** para calidad de código
- ✅ **Estructura de carpetas escalable** por features
- ✅ **Barrel files** (`index.ts`) para imports limpios
- ✅ **TypeScript strict mode** habilitado

#### 🔒 Seguridad & Buenas Prácticas
- ✅ **Tipos estrictos** en toda la aplicación (no `any` sin justificar)
- ✅ **Validación de formularios** client-side
- ✅ **Guards de autenticación** en rutas privadas
- ✅ **Encapsulación** de lógica de negocio en use-cases

---

## 🎮 Demo & Credenciales

### Usuarios de Prueba

| Rol | Email | Contraseña | Descripción |
|-----|-------|-----------|-------------|
| **Admin** | `admin@test.com` | `admin123` | Acceso completo al sistema |
| **Soporte** | `support@test.com` | `support123` | Gestión de tickets asignados |
| **Cliente** | `client@test.com` | `client123` | Creación y seguimiento de tickets |

> **Nota**: La API Mock valida credenciales exactas. Usa estos datos para login.

---

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 20.19+ o 22.12+
- npm o pnpm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/fe-cifra-tech.git
cd fe-cifra-tech

# 2. Instalar dependencias
npm install

# 3. Iniciar Mock API (Terminal 1)
npm run server
# ✅ Mock Server corriendo en http://localhost:3001
# 📊 Endpoints disponibles:
#    - GET/POST http://localhost:3001/users
#    - GET/POST/PATCH http://localhost:3001/tickets

# 4. Iniciar aplicación (Terminal 2)
npm run dev
# ✅ App corriendo en http://localhost:5173

# 5. Abrir en el navegador
# http://localhost:5173
```

> **⚠️ IMPORTANTE**: Necesitas **2 terminales** corriendo simultáneamente:
> - Terminal 1: Mock API Server (`npm run server`)
> - Terminal 2: React App (`npm run dev`)

### 🔧 Configuración del Mock Server

El proyecto usa **json-server** para simular una API REST completa.

**Archivo de datos**: `server/db.json`

```json
{
  "users": [
    { "id": 1, "email": "admin@test.com", "password": "admin123", "role": "admin", "name": "Admin User" },
    { "id": 2, "email": "support@test.com", "password": "support123", "role": "support", "name": "Support Agent" },
    { "id": 3, "email": "client@test.com", "password": "client123", "role": "client", "name": "Client User" }
  ],
  "tickets": [
    // ... tickets data
  ]
}
```

**Características del Mock Server**:
- ✅ **Delay de 500ms** para simular latencia real
- ✅ **Endpoints RESTful** completos (GET, POST, PATCH, DELETE)
- ✅ **Relaciones** entre usuarios y tickets (`_expand=user`)
- ✅ **Filtros** por query params (`?userId=1`, `?status=pendiente`)
- ✅ **Puerto**: 3001 (configurable en `package.json`)

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (puerto 5173)
npm run server       # Inicia Mock API (puerto 3001)
npm run dev:all      # Inicia ambos simultáneamente (si tienes concurrently)

# Build
npm run build        # Build de producción
npm run preview      # Preview del build

# Testing
npm run test         # Ejecuta tests con Vitest
npm run test:watch   # Tests en modo watch
npm run test:ui      # UI interactiva de Vitest

# Calidad
npm run lint         # Verifica código con ESLint
npm run format       # Formatea código con Prettier
```

### Verificar que el Mock Server está corriendo

```bash
# En una terminal separada, verifica los endpoints:
curl http://localhost:3001/users
curl http://localhost:3001/tickets

# O abre en el navegador:
# http://localhost:3001/users
# http://localhost:3001/tickets
```

### Solución de Problemas

**❌ Error: "Cannot GET /"**
```bash
# El Mock Server está corriendo pero no hay ruta raíz
# ✅ Solución: Accede a /users o /tickets
http://localhost:3001/users
```

**❌ Error: "Port 3001 already in use"**
```bash
# Otro proceso está usando el puerto
# ✅ Solución: Mata el proceso
lsof -ti:3001 | xargs kill -9
```

**❌ Error: "ECONNREFUSED localhost:3001"**
```bash
# El Mock Server no está corriendo
# ✅ Solución: Inicia el servidor
npm run server
```


---

## 🏗️ Arquitectura

Este proyecto implementa **Domain-Driven Design** y **Clean Architecture**.

```
src/
├── features/              # Dominios de negocio
│   ├── auth/             # Dominio: Autenticación
│   │   ├── entities/     # Modelos de dominio
│   │   ├── adapters/     # API → Entidades
│   │   ├── use-cases/    # Lógica de negocio
│   │   ├── hooks/        # Estado React
│   │   ├── components/   # UI Presentacional
│   │   └── wrapper-components/  # UI con Lógica
│   ├── admin/            # Dominio: Administración
│   ├── support/          # Dominio: Soporte
│   └── client/           # Dominio: Cliente
│
├── components/           # Componentes compartidos
│   ├── cross/           # Reutilizables (Button, Input, Select)
│   ├── ui/              # UI específicos (Toast, Pagination)
│   ├── layout/          # Layout components
│   └── guards/          # Protección de rutas
│
├── store/               # Estado global (Zustand)
├── services/            # Servicios API
├── hooks/               # Hooks globales
└── pages/               # Páginas (React Router)
```

### Flujo de Datos (Patrón Adapter)

```
API Response → Adapter → Entity → Hook → Component
     (JSON)      (Transform)  (Type)   (State)  (UI)
```

**Ventajas**:
- ✅ Frontend desacoplado del backend
- ✅ Cambios en API no afectan componentes
- ✅ Tipado fuerte en toda la aplicación
- ✅ Testing simplificado (mocks por capa)

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para más detalles.

---

## 🛠️ Stack Tecnológico

### Core
- **React 18.3** - UI Library
- **TypeScript 5.5** - Tipado estático
- **Vite 7.2** - Build tool & Dev server

### Estado & Routing
- **Zustand 5.0** - Estado global ligero
- **React Router 7.1** - Navegación SPA

### Testing
- **Vitest** - Unit & integration testing
- **Testing Library** - Component testing
- **MSW** (preparado) - API mocking

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **Chart.js** - Gráficas de dashboard
- **Lucide React** - Iconos

### Quality Tools
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message validation

### Backend Mock
- **json-server** - REST API simulada
- **Concurrently** - Múltiples procesos en paralelo

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests de un dominio específico
npx vitest run src/features/auth
```

### Cobertura de Tests

```
✅ Auth Domain       → 31 tests passing
✅ Support Domain    → 16 tests passing
✅ Client Domain     →  5 tests passing
✅ Admin Domain      →  4 tests passing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOTAL             → 56 tests passing
```

### Estrategia de Testing

- **Adapters**: Validar transformación API → Entity
- **Use Cases**: Validar lógica de negocio + mocks de fetch
- **Hooks**: Validar estado React con `renderHook`
- **Components**: Validar renderizado y eventos de usuario

---

## 📁 Estructura del Proyecto

```
fe-cifra-tech/
├── public/              # Assets estáticos
├── server/              # Mock API
│   └── db.json         # Base de datos simulada
├── src/
│   ├── features/       # Dominios DDD (ver arriba)
│   ├── components/     # Componentes compartidos
│   ├── pages/          # Páginas de la aplicación
│   ├── store/          # Zustand stores
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks globales
│   ├── router/         # Configuración de rutas
│   ├── types/          # TypeScript types globales
│   └── main.tsx        # Entry point
├── .husky/             # Git hooks
├── ARCHITECTURE.md     # Documentación arquitectura
├── CONTRIBUTING.md     # Guía de contribución
└── package.json
```

---

## 🤝 Contribuir

Lee [CONTRIBUTING.md](./CONTRIBUTING.md) para conocer:
- Workflow de Git (feature branches)
- Estándares de commits (Conventional Commits)
- Reglas de linting y formateo

---

## 📄 Licencia

Este proyecto es una prueba técnica y está disponible con fines educativos.

---

## 👨‍💻 Autor

**Fernando Rodríguez**  
Senior Frontend Developer  
📧 Email: [tu-email@example.com](mailto:tu-email@example.com)  
🔗 LinkedIn: [tu-linkedin](https://linkedin.com/in/tu-perfil)

---

## 🙏 Agradecimientos

Desarrollado como prueba técnica para demostrar:
- ✅ Arquitectura frontend profesional
- ✅ Implementación de patrones de diseño avanzados
- ✅ Capacidad de testing y documentación
- ✅ Mejores prácticas de desarrollo

**Made with ❤️ and Clean Architecture**
