# 🚀 Configuración de Mock API con JSON Server

## 📋 Descripción

Configuración completa de JSON Server como API mock para desarrollo y pruebas. Se incluye una base de datos realista con usuarios y tickets, además de documentación completa de la API.

## ✨ Cambios Realizados

### 📦 Dependencias
- ✅ Instalado `json-server@0.17.4` (versión estable) como dependencia de desarrollo
- ✅ Script `npm run server` agregado para ejecutar el servidor mock

### 🗄️ Base de Datos Mock (`db.json`)
- ✅ **5 usuarios** con diferentes roles:
  - 1 Admin (id: 1)
  - 1 Soporte (id: 2)
  - 3 Clientes (ids: 3, 4, 5)
- ✅ **18 tickets** realistas con:
  - Estados variados: `pendiente`, `en_proceso`, `resuelto`
  - Prioridades: `alta`, `media`, `baja`
  - Categorías: autenticación, pagos, facturación, técnico, consultas, configuración
  - Datos completos: fechas, respuestas, asignaciones
  - Algunos asignados al soporte, otros sin asignar

### 📚 Documentación
- ✅ `API_DOCUMENTATION.md` completo con:
  - Guía de configuración rápida
  - Endpoints documentados con ejemplos
  - Casos de uso por rol (Admin, Soporte, Cliente)
  - Filtros avanzados de JSON Server
  - Ejemplos de código TypeScript/JavaScript
  - Estructura de datos (interfaces TypeScript)

## 🔧 Configuración

### Script Agregado
```json
"server": "json-server --watch db.json --port 3001 --delay 500"
```

### Características
- **Puerto:** 3001 (no interfiere con React en puerto 3000)
- **Delay:** 500ms (simula latencia real de red)
- **Watch mode:** Los cambios en `db.json` se reflejan automáticamente

## 🚀 Cómo Usar

### 1. Iniciar el servidor mock
```bash
npm run server
```

El servidor estará disponible en: `http://localhost:3001`

### 2. Ejecutar React (en otra terminal)
```bash
npm run dev
```

### 3. Endpoints Principales

#### Autenticación (Login Simulado)
```
GET /users?email={email}&password={password}
```

#### Tickets
- **Todos los tickets:** `GET /tickets?_expand=user`
- **Tickets por usuario:** `GET /tickets?userId={id}`
- **Tickets asignados:** `GET /tickets?assignedTo={id}&status_ne=resuelto`
- **Crear ticket:** `POST /tickets`
- **Actualizar ticket:** `PATCH /tickets/{id}`

Ver documentación completa en `API_DOCUMENTATION.md`

## 🧪 Testing Realizado

✅ **Validación de Endpoints:**
- GET /tickets (listar todos)
- GET /users (login simulado)
- GET /tickets/{id} (ticket específico)
- GET /tickets?userId={id} (filtro por usuario)
- GET /tickets?assignedTo={id} (filtro por asignación)
- GET /tickets?status=pendiente (filtro por estado)
- GET /tickets?status_ne=resuelto (operador _ne)
- GET /tickets?_sort=date&_order=desc (ordenamiento)
- POST /tickets (crear nuevo ticket)
- PATCH /tickets/{id} (actualizar ticket)

✅ **Validación de Delay:**
- Delay de 500ms funcionando correctamente (~0.524s tiempo de respuesta)

✅ **Validación de Versión:**
- JSON Server 0.17.4 (versión estable) instalada y funcionando

## 📝 Credenciales de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| Admin | `admin@cifratech.com` | `admin123` |
| Soporte | `soporte@cifratech.com` | `soporte123` |
| Cliente | `cliente@example.com` | `cliente123` |

## 📂 Archivos Modificados

- `package.json` - Agregado script `server` y dependencia `json-server`
- `package-lock.json` - Actualizado con dependencias
- `db.json` - **NUEVO** - Base de datos mock con usuarios y tickets
- `API_DOCUMENTATION.md` - **NUEVO** - Documentación completa de la API

## ✅ Checklist

- [x] Instalación de json-server (versión estable)
- [x] Creación de db.json con datos realistas
- [x] Script de servidor configurado
- [x] Documentación completa creada
- [x] Validación de endpoints realizada
- [x] Delay configurado y funcionando
- [x] Tests pasando (ESLint + Vitest)
- [x] Commit realizado con mensaje descriptivo

## 🔗 Referencias

- [JSON Server Documentation](https://github.com/typicode/json-server)
- Ver `API_DOCUMENTATION.md` para documentación completa de endpoints

## 📸 Capturas

*(Si aplica, agregar capturas de pantalla de los endpoints funcionando)*

---

**Tipo:** `chore`  
**Rama:** `chore/settings-mock-api`  
**Impacto:** No rompe funcionalidad existente, solo agrega configuración de desarrollo

