# Usuario Frontend - Angular + NG-ZORRO

## 🎯 Descripción

Frontend desarrollado en **Angular 20.3.7** con **NG-ZORRO (Ant Design)** para gestionar usuarios. Se conecta con el backend de Spring Boot para realizar operaciones CRUD completas.

---

## 🚀 Tecnologías

- **Angular 20.3.7** - Framework frontend
- **NG-ZORRO 20.4.1** - Biblioteca de componentes UI (Ant Design)
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **HttpClient** - Comunicación con backend

---

## 📋 Funcionalidades

### CRUD Completo de Usuarios
- ✅ **Crear** usuario con modal form
- ✅ **Listar** todos los usuarios en tabla
- ✅ **Actualizar** usuario existente
- ✅ **Eliminar** usuario con confirmación

### Características UI
- 📊 Tabla responsive con NG-ZORRO
- 📝 Formularios modales para crear/editar
- ⚠️ Confirmación antes de eliminar
- 💬 Mensajes de éxito/error
- 🎨 Diseño moderno con Ant Design

---

## ⚙️ Configuración

### Backend API
```typescript
private apiUrl = 'http://localhost:8082/api/usuarios';
```

El frontend se conecta al backend de Spring Boot que debe estar corriendo en el puerto **8082**.

---

## 🏃 Cómo Ejecutar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
ng serve
```

### 3. Acceder a la aplicación
Abrir navegador en: **http://localhost:4200**

---

## 📁 Estructura del Proyecto

```
src/app/
├── components/
│   └── usuario-list/          # Componente principal CRUD
│       ├── usuario-list.ts    # Lógica del componente
│       ├── usuario-list.html  # Template con NG-ZORRO
│       └── usuario-list.css   # Estilos
├── models/
│   └── usuario.ts             # Interface Usuario
├── services/
│   └── usuario.ts             # Servicio HTTP para API
├── app.config.ts              # Configuración de la app
├── app.routes.ts              # Rutas de la aplicación
└── app.html                   # Template principal
```

---

## 🔗 Integración con Backend

### Requisitos
1. Backend de Spring Boot corriendo en `http://localhost:8082`
2. CORS configurado en el backend para permitir `http://localhost:4200`
3. Base de datos MySQL activa

### Endpoints Consumidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

---

## 🎨 Componentes NG-ZORRO Utilizados

- `nz-table` - Tabla de datos
- `nz-button` - Botones de acción
- `nz-modal` - Modales para formularios
- `nz-form` - Formularios
- `nz-input` - Campos de entrada
- `nz-popconfirm` - Confirmación de eliminación
- `nz-icon` - Iconos
- `nz-message` - Mensajes de notificación

---

## 📝 Modelo de Datos

```typescript
export interface Usuario {
  id?: string;
  name: string;
  cargo: string;
  telefono: string;
}
```

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
ng serve

# Build para producción
ng build

# Ejecutar tests
ng test

# Linting
ng lint
```

---

## 📦 Dependencias Principales

```json
{
  "@angular/core": "^20.3.7",
  "@angular/common": "^20.3.7",
  "@angular/router": "^20.3.7",
  "ng-zorro-antd": "^20.4.1",
  "rxjs": "~7.8.0",
  "zone.js": "~0.15.0"
}
```

---

## 🌐 CORS

El backend debe tener configurado CORS para permitir peticiones desde:
```
http://localhost:4200
```

---

## 📸 Capturas de Pantalla

### Vista Principal
- Tabla con lista de usuarios
- Botón "Nuevo Usuario"
- Acciones de editar y eliminar por fila

### Modal Crear/Editar
- Formulario con campos: Nombre, Cargo, Teléfono
- Validación de campos requeridos
- Botones Cancelar y Guardar

---

## 🔜 Próximas Mejoras

- [ ] Paginación en la tabla
- [ ] Búsqueda y filtros
- [ ] Validación de formularios más robusta
- [ ] Manejo de errores mejorado
- [ ] Tests unitarios
- [ ] Tests E2E

---

## 👨‍💻 Desarrollo

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 20.3.7.

Para más información sobre Angular, visita [angular.dev](https://angular.dev).
