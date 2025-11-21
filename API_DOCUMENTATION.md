# 📚 Documentación de API Mock - Sistema de Tickets

## 🚀 Configuración Rápida

### 1. Instalación

```bash
npm install json-server --save-dev
```

### 2. Ejecutar el servidor mock

```bash
npm run server
```

El servidor estará disponible en: **http://localhost:3001**

**Nota importante:** El flag `--delay 500` simula una latencia de red de 500ms, lo cual es perfecto para probar estados de carga en tu frontend.

---

## 🔐 Autenticación (Simulada)

Como JSON Server no tiene autenticación real, usaremos filtros de búsqueda para validar credenciales.

### Endpoint de Login

```
GET /users?email={email}&password={password}
```

### Ejemplo de uso:

```javascript
// Login simulado
const response = await fetch(
  'http://localhost:3001/users?email=admin@cifratech.com&password=admin123'
)
const users = await response.json()

if (users.length === 0) {
  // Credenciales incorrectas
  throw new Error('Email o contraseña incorrectos')
}

// Login exitoso - guardar usuario en localStorage o Context
const user = users[0]
localStorage.setItem('user', JSON.stringify(user))
```

### Usuarios de prueba disponibles:

| Email                       | Password   | Role    | ID  |
| --------------------------- | ---------- | ------- | --- |
| admin@cifratech.com         | admin123   | admin   | 1   |
| soporte@cifratech.com       | soporte123 | support | 2   |
| cliente@example.com         | cliente123 | client  | 3   |
| ana.martinez@empresa.com    | cliente123 | client  | 4   |
| carlos.rodriguez@startup.io | cliente123 | client  | 5   |

---

## 🎫 Endpoints de Tickets

### 1. Listar Todos los Tickets (Admin)

Obtiene todos los tickets con información del usuario que los creó.

```
GET /tickets?_expand=user
```

**Ejemplo:**

```javascript
const response = await fetch('http://localhost:3001/tickets?_expand=user')
const tickets = await response.json()
```

### 2. Listar Mis Tickets (Cliente)

Obtiene solo los tickets creados por un usuario específico.

```
GET /tickets?userId={user_id}
```

**Ejemplo:**

```javascript
const userId = 3
const response = await fetch(`http://localhost:3001/tickets?userId=${userId}`)
const myTickets = await response.json()
```

### 3. Listar Tickets Asignados (Soporte)

Obtiene los tickets asignados a un agente de soporte que no estén resueltos.

```
GET /tickets?assignedTo={support_id}&status_ne=resuelto
```

**Ejemplo:**

```javascript
const supportId = 2
const response = await fetch(
  `http://localhost:3001/tickets?assignedTo=${supportId}&status_ne=resuelto`
)
const assignedTickets = await response.json()
```

### 4. Obtener un Ticket Específico

```
GET /tickets/{id}
```

**Ejemplo:**

```javascript
const ticketId = 1
const response = await fetch(`http://localhost:3001/tickets/${ticketId}`)
const ticket = await response.json()
```

### 5. Crear un Nuevo Ticket

```
POST /tickets
Content-Type: application/json
```

**Payload:**

```json
{
  "title": "Mi problema",
  "description": "Descripción detallada del problema",
  "userId": 3,
  "status": "pendiente",
  "priority": "media",
  "date": "2024-03-25T10:00:00Z",
  "updatedAt": "2024-03-25T10:00:00Z",
  "response": "",
  "category": "tecnico",
  "assignedTo": null
}
```

**Ejemplo:**

```javascript
const newTicket = {
  title: 'Mi problema',
  description: 'Descripción detallada',
  userId: 3,
  status: 'pendiente',
  priority: 'media',
  date: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  response: '',
  category: 'tecnico',
  assignedTo: null,
}

const response = await fetch('http://localhost:3001/tickets', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newTicket),
})

const createdTicket = await response.json()
```

### 6. Actualizar/Responder Ticket (Soporte)

```
PATCH /tickets/{id}
Content-Type: application/json
```

**Payload:**

```json
{
  "status": "resuelto",
  "response": "Hemos solucionado tu problema...",
  "updatedAt": "2024-03-25T12:00:00Z"
}
```

**Ejemplo:**

```javascript
const ticketId = 1
const update = {
  status: 'resuelto',
  response: 'Hemos reiniciado tu cuenta. Por favor intenta nuevamente.',
  updatedAt: new Date().toISOString(),
}

const response = await fetch(`http://localhost:3001/tickets/${ticketId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(update),
})

const updatedTicket = await response.json()
```

### 7. Asignar Ticket a Soporte

```
PATCH /tickets/{id}
Content-Type: application/json
```

**Payload:**

```json
{
  "assignedTo": 2,
  "status": "en_proceso",
  "updatedAt": "2024-03-25T12:00:00Z"
}
```

---

## 📊 Estadísticas (Frontend)

JSON Server no tiene un endpoint `/stats` automático. Debes obtener todos los tickets y calcular las estadísticas en el frontend.

### Estrategia:

```javascript
// 1. Obtener todos los tickets
const response = await fetch('http://localhost:3001/tickets')
const tickets = await response.json()

// 2. Calcular estadísticas en el cliente
const stats = {
  total: tickets.length,
  pendientes: tickets.filter(t => t.status === 'pendiente').length,
  enProceso: tickets.filter(t => t.status === 'en_proceso').length,
  resueltos: tickets.filter(t => t.status === 'resuelto').length,
  altaPrioridad: tickets.filter(t => t.priority === 'alta').length,
  mediaPrioridad: tickets.filter(t => t.priority === 'media').length,
  bajaPrioridad: tickets.filter(t => t.priority === 'baja').length,
}
```

---

## 🔍 Filtros Avanzados de JSON Server

JSON Server soporta varios operadores de filtrado:

- `_ne`: No igual (not equal)
- `_like`: Contiene texto (LIKE)
- `_gte`: Mayor o igual (greater than or equal)
- `_lte`: Menor o igual (less than or equal)
- `_sort`: Ordenar
- `_order`: Dirección del orden (asc/desc)
- `_limit`: Limitar resultados
- `_page`: Paginación

### Ejemplos:

```javascript
// Tickets pendientes o en proceso
GET /tickets?status_ne=resuelto

// Tickets de alta prioridad
GET /tickets?priority=alta

// Tickets ordenados por fecha (más recientes primero)
GET /tickets?_sort=date&_order=desc

// Últimos 5 tickets
GET /tickets?_sort=date&_order=desc&_limit=5

// Tickets que contengan "login" en el título
GET /tickets?title_like=login

// Tickets creados después de una fecha
GET /tickets?date_gte=2024-03-20T00:00:00Z
```

---

## 📋 Estructura de Datos

### Usuario (User)

```typescript
interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'support' | 'client'
  createdAt: string // ISO 8601
}
```

### Ticket

```typescript
interface Ticket {
  id: number
  title: string
  description: string
  userId: number // ID del usuario que creó el ticket
  assignedTo: number | null // ID del agente de soporte asignado
  status: 'pendiente' | 'en_proceso' | 'resuelto'
  priority: 'baja' | 'media' | 'alta'
  date: string // ISO 8601 - Fecha de creación
  updatedAt: string // ISO 8601 - Última actualización
  response: string // Respuesta del soporte (vacío si está pendiente)
  category:
    | 'autenticacion'
    | 'pagos'
    | 'facturacion'
    | 'tecnico'
    | 'consultas'
    | 'configuracion'
}
```

---

## 🎯 Casos de Uso por Rol

### Admin

- Ver todos los tickets: `GET /tickets?_expand=user`
- Ver estadísticas: Calcular en frontend desde todos los tickets
- Asignar tickets: `PATCH /tickets/{id}` con `assignedTo`

### Soporte

- Ver tickets asignados: `GET /tickets?assignedTo={id}&status_ne=resuelto`
- Responder ticket: `PATCH /tickets/{id}` con `response` y `status`
- Cambiar estado: `PATCH /tickets/{id}` con `status`

### Cliente

- Ver mis tickets: `GET /tickets?userId={id}`
- Crear ticket: `POST /tickets`
- Ver detalles: `GET /tickets/{id}`

---

## ⚠️ Notas Importantes

1. **Delay de 500ms**: El servidor tiene un delay configurado para simular latencia real. Asegúrate de manejar estados de carga en tu UI.

2. **Persistencia**: Los cambios se guardan en `db.json`. Si reinicias el servidor, los cambios persisten.

3. **CORS**: JSON Server permite CORS por defecto, así que no deberías tener problemas desde tu frontend React.

4. **Validación**: JSON Server no valida los datos. Asegúrate de validar en el frontend antes de enviar.

5. **IDs automáticos**: Al crear nuevos recursos, JSON Server genera IDs automáticamente.

---

## 🧪 Testing

Para probar los endpoints, puedes usar:

- **Navegador**: Visita `http://localhost:3001/tickets` para ver todos los tickets
- **Postman/Insomnia**: Importa los endpoints y prueba las peticiones
- **curl**:
  ```bash
  curl http://localhost:3001/tickets
  ```

---

## 📝 Ejemplo Completo de Servicio en React

```typescript
// services/ticketService.ts
const API_BASE_URL = 'http://localhost:3001'

export const ticketService = {
  async login(email: string, password: string) {
    const response = await fetch(
      `${API_BASE_URL}/users?email=${email}&password=${password}`
    )
    const users = await response.json()
    if (users.length === 0) {
      throw new Error('Credenciales incorrectas')
    }
    return users[0]
  },

  async getAllTickets() {
    const response = await fetch(`${API_BASE_URL}/tickets?_expand=user`)
    return response.json()
  },

  async getMyTickets(userId: number) {
    const response = await fetch(`${API_BASE_URL}/tickets?userId=${userId}`)
    return response.json()
  },

  async getAssignedTickets(supportId: number) {
    const response = await fetch(
      `${API_BASE_URL}/tickets?assignedTo=${supportId}&status_ne=resuelto`
    )
    return response.json()
  },

  async createTicket(ticket: Omit<Ticket, 'id'>) {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    })
    return response.json()
  },

  async updateTicket(id: number, updates: Partial<Ticket>) {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updates,
        updatedAt: new Date().toISOString(),
      }),
    })
    return response.json()
  },
}
```

---

¡Listo! Ya tienes todo configurado para empezar a desarrollar tu frontend. 🚀
