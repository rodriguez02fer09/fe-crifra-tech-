# 📌 fe-cifra-tech

> **Sistema de Gestión de Solicitudes – Frontend (React + TypeScript)**

> Prueba técnica que simula un flujo real de soporte con roles: _Cliente,
> Soporte y Administrador_.

---

## 📛 Badges

![React](https://img.shields.io/badge/React-18.0-blue)

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

![Zustand](https://img.shields.io/badge/Zustand-Store-orange)

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-00bcd4)

![Testing Library](https://img.shields.io/badge/Testing--Library-React-red)

![Husky](https://img.shields.io/badge/Husky-GitHooks-purple)

---

# 🧩 Descripción General

**fe-cifra-tech** es una aplicación frontend desarrollada con **React +
TypeScript**, cuyo objetivo es gestionar solicitudes dentro de un sistema con
tres roles principales:

- **Cliente** → Crea solicitudes y consulta su estado.

- **Soporte** → Atiende solicitudes, actualiza estados y genera respuestas.

- **Administrador** → Gestiona todas las solicitudes, aplica filtros y visualiza
  estadísticas.

La aplicación está construida aplicando **arquitectura limpia**, **patrones
modernos**, **componentes reutilizables**, un **estado global simple (Zustand)**
y buenas prácticas de la industria.

---

# 🎯 Objetivos Principales

- Construir una aplicación frontend modular, escalable y mantenible.

- Consumir una API simulada a través de servicios reutilizables.

- Usar patrones sólidos en React + TypeScript.

- Garantizar calidad mediante linters, tests y buenas prácticas.

- Documentar decisiones técnicas, arquitectura y roadmap.

---

# 📌 Requerimientos Funcionales

### 🔐 Autenticación

- Login con selección de rol (simulado o real).

### 👤 Cliente

- Crear solicitudes mediante formulario.

- Ver solicitudes creadas.

- Ver estado y respuesta del soporte.

### 🧑‍🔧 Soporte

- Listado de solicitudes asignadas.

- Actualización del estado.

- Redacción de una respuesta.

### 🛡️ Administrador

- Listado general de solicitudes.

- Filtros por cliente, estado o fecha.

- Dashboard de estadísticas simples.

---

# ⚙️ Requerimientos Técnicos

- React + TypeScript

- Arquitectura modular basada en responsabilidades

- Manejo de estado global con Zustand

- Servicios de API desacoplados

- Formularios validados

- TailwindCSS para estilos

- ESLint + Prettier + Husky

- Testing con React Testing Library

- API simulada: MSW o json-server

- Diseño responsive y accesible

- Componentes reutilizables (Atomic Design adaptado)

---

# 🧱 Arquitectura del Proyecto

```
src/
├── assets/ # Iconos, imágenes, fuentes
├── components/ # Componentes genéricos y reutilizables
├── modules/ # Secciones divididas por rol
│   ├── client/
│   ├── support/
│   └── admin/
├── store/ # Estado global (Zustand)
├── services/ # Llamadas a API desacopladas
├── hooks/ # Hooks reutilizables
├── routes/ # Definición del enrutador
├── types/ # Tipos globales de TypeScript
└── utils/ # Funciones auxiliares
```

---

# 🧭 Principios y Estándares Usados

### ✔ Clean Code

- Nombres descriptivos

- Funciones pequeñas

- Evitar duplicación

### ✔ Separation of Concerns

- UI ≠ lógica de negocio ≠ acceso a datos

### ✔ Minimal Global State

- Zustand solo para lo necesario

### ✔ Patrón basado en módulos

- Cada rol tiene su propio espacio aislado

### ✔ Servicios desacoplados

- No hay lógica de API en los componentes

---

# 🚀 Instalación

```bash
git clone https://github.com/tu-usuario/fe-cifra-tech
cd fe-cifra-tech
npm install
npm run dev
```

---

# 🔧 Scripts Disponibles

```bash
npm run dev        # Ejecuta la app en modo desarrollo
npm run build      # Build de producción
npm run preview    # Previsualiza el build
npm run lint       # Corre ESLint
npm run format     # Formatea con Prettier
npm run test       # Ejecuta pruebas con RTL
```

---

# 🔌 Mock API (Simulada)

El proyecto puede utilizar cualquiera de estas opciones:

- MSW (recomendada)

- json-server

- Mocks locales

Ejemplo de estructura:

```
services/
└── requests.service.ts
```

Funciones esperadas:

```typescript
getRequests()
createRequest(data)
updateRequestStatus(id, status)
```

---

# 🧪 Testing

El proyecto incluye:

- Pruebas unitarias: componentes puros

- Pruebas de integración: formularios

- Pruebas de servicios: API mock

- Pruebas del store global (Zustand)

Ejecutar:

```bash
npm run test
```

---

# 🧰 Variables de Entorno

Archivo `.env`:

```ini
VITE_API_URL=http://localhost:4000
```

---

# 👨‍💻 Convenciones de Commits (Husky + Commitlint)

Ejemplos de commits válidos:

```
feat: agregar formulario de solicitudes
fix: corregir actualización de estado
refactor: extraer lógica de servicios
test: agregar pruebas a módulo soporte
docs: actualizar README
style: formatear codigo
```

---

# 🗺️ Roadmap del Proyecto (TODO)

## 🚀 Fase 1 – Setup Inicial

- [✓] Crear proyecto React + TS
- [✓] Instalar Tailwind
- [✓] ESLint + Prettier
- [✓] Husky para hooks Git
- [ ] Definir estructura base
- [ ] Configurar React Router
- [ ] Configurar Zustand
- [ ✓] Configurar React Test Library

## 📦 Fase 2 – Infraestructura

- [ ] Mock API
- [ ] Servicios de solicitudes
- [ ] Interfaces globales
- [ ] Layouts principales
- [ ] Componentes compartidos

## 👤 Fase 3 – Cliente

- [ ] Formulario para crear solicitudes
- [ ] Listado de solicitudes propias
- [ ] Vista detallada (estado + respuesta)

## 🧑‍🔧 Fase 4 – Soporte

- [ ] Listado de solicitudes asignadas
- [ ] Actualización de estado
- [ ] Redacción de respuesta

## 🛡️ Fase 5 – Administrador

- [ ] Tabla general con filtros
- [ ] Dashboard simple (Recharts)
- [ ] Gestión de usuarios (opcional)

## 🧪 Fase 6 – Testing

- [ ] Tests de componentes
- [ ] Tests de hooks
- [ ] Tests de servicios
- [ ] Tests del store Zustand

## 🎨 Fase 7 – UI/UX

- [ ] Diseño responsive
- [ ] Manejo de errores
- [ ] Toasters, loaders y feedback

## 🚀 Fase 8 – Deploy

- [ ] Generar build
- [ ] Deploy en Vercel / Netlify
- [ ] Documentar URL final

---

# 📝 Funcionalidades Implementadas

(Se irá completando conforme avanza el desarrollo)

---

# 🧠 Decisiones Técnicas Importantes

(Añade las que tomes durante la construcción)

- Uso de Zustand para estado global por simplicidad y rendimiento.

- Separación completa entre UI / lógica / servicios.

- Patrón modular por roles para escalabilidad.

- Componentes atómicos y reutilizables.

---

# 📄 Licencia

MIT License.

---

Si quieres, te preparo también:

✅ **ARCHITECTURE.md**

✅ **CONTRIBUTING.md**

✅ **plantilla de commitlint**

✅ **estructura inicial del proyecto con todos los archivos**
