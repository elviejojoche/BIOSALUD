# 🏥 BIOSALUD

**Vida, salud y tecnología**

![Logo BIOSALUD](public/img/logo.jpg)

BIOSALUD es un aplicativo web para la **gestión básica de un hospital**. Permite administrar pacientes, médicos y citas médicas desde una interfaz sencilla, moderna y adaptable a celulares.

> 📌 **Primer avance:** el sistema funciona con **datos de demostración en memoria**. El código está organizado para conectar **MySQL** en el siguiente avance.

---

## ✨ Funcionalidades

| Módulo | Qué permite hacer |
|---|---|
| **Página principal** | Presentación del hospital, logo, eslogan y acceso a los módulos. |
| **Dashboard** | Total de pacientes, médicos, citas programadas y pendientes; próximas citas y pacientes recientes. |
| **Pacientes** | Ver, buscar, registrar, editar y eliminar pacientes. |
| **Médicos** | Ver, buscar, registrar, editar y eliminar médicos. |
| **Citas** | Ver, buscar, filtrar por estado, registrar, editar y eliminar citas. |

### Validaciones

Todas las validaciones se hacen **en el navegador** (respuesta inmediata) y **en el servidor** (seguridad).

- **Pacientes:** nombre, apellido, documento, teléfono, correo y EPS obligatorios; documento y teléfono solo con números; correo con formato válido; documento sin repetir.
- **Médicos:** nombre, especialidad, documento, teléfono y correo obligatorios; correo con formato válido; documento sin repetir.
- **Citas:** paciente, médico, fecha, hora y motivo obligatorios; no se permiten fechas pasadas al registrar; el médico debe estar activo y no puede tener dos citas a la misma hora.
- No se puede eliminar un paciente o médico que tenga citas registradas.

---

## 🛠️ Tecnologías

- **TypeScript**
- **Node.js** (v20.12 o superior)
- **Express.js**
- **HTML** y **CSS**
- **JavaScript** (en el navegador)
- **Visual Studio Code**
- **Git / GitHub**

---

## 📁 Estructura del proyecto

```
biosalud/
├── src/                        # Código del servidor (TypeScript)
│   ├── server.ts               # Enciende el servidor
│   ├── app.ts                  # Configura Express (middlewares y rutas)
│   ├── models/                 # Interfaces: cómo es cada dato
│   ├── data/                   # Datos de demostración (luego: MySQL)
│   ├── validations/            # Reglas de validación
│   ├── services/               # Lógica y acceso a los datos
│   ├── controllers/            # Reciben la petición y responden
│   ├── routes/                 # URLs de la API y de las páginas
│   └── middlewares/            # Logger, página 404 y errores
├── views/                      # Páginas HTML
├── public/                     # Archivos estáticos
│   ├── css/styles.css          # Estilos (azul, verde y blanco)
│   ├── js/                     # JavaScript de cada página
│   └── img/                    # Logo
├── .env.example                # Ejemplo de variables de entorno
├── package.json
└── tsconfig.json
```

### ¿Cómo viaja una petición?

```
Navegador → routes → controllers → validations → services → data
                                                       ↑
                                  (aquí se conectará MySQL)
```

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/USUARIO/biosalud.git
   cd biosalud
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. *(Opcional)* Crear el archivo `.env` a partir del ejemplo:
   ```bash
   cp .env.example .env
   ```

4. Ejecutar en modo desarrollo (se reinicia solo al guardar cambios):
   ```bash
   npm run dev
   ```

5. Abrir en el navegador: **http://localhost:3000**

> 💡 En Windows, si PowerShell bloquea `npm`, usa `npm.cmd run dev`.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Ejecuta el servidor en modo desarrollo. |
| `npm run build` | Compila TypeScript a JavaScript en la carpeta `dist/`. |
| `npm start` | Ejecuta la versión compilada. |

---

## 🔌 API REST

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estado` | Comprueba que el servidor funciona |
| GET | `/api/dashboard` | Totales, próximas citas y pacientes recientes |
| GET | `/api/pacientes?buscar=` | Listar y buscar pacientes |
| GET | `/api/pacientes/:id` | Obtener un paciente |
| POST | `/api/pacientes` | Registrar paciente |
| PUT | `/api/pacientes/:id` | Editar paciente |
| DELETE | `/api/pacientes/:id` | Eliminar paciente |
| GET | `/api/medicos?buscar=` | Listar y buscar médicos |
| GET | `/api/medicos/:id` | Obtener un médico |
| POST | `/api/medicos` | Registrar médico |
| PUT | `/api/medicos/:id` | Editar médico |
| DELETE | `/api/medicos/:id` | Eliminar médico |
| GET | `/api/citas?buscar=&estado=` | Listar, buscar y filtrar citas |
| GET | `/api/citas/:id` | Obtener una cita |
| POST | `/api/citas` | Registrar cita |
| PUT | `/api/citas/:id` | Editar cita o cambiar estado |
| DELETE | `/api/citas/:id` | Eliminar cita |

---

## 🗺️ Próximos pasos

- [ ] Conectar base de datos **MySQL**.
- [ ] Inicio de sesión de usuarios.
- [ ] Historia clínica de pacientes.

---

## 👤 Autor

Proyecto académico desarrollado por **elviejojoche** — 2026.
