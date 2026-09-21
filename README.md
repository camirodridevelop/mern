# 🔐 MERN Auth: registro, login y sesión de usuario

Proyecto de aprendizaje **full stack** con el stack MERN (MongoDB, Express, React y Node.js): un sistema de autenticación donde los usuarios se registran, inician sesión y mantienen la sesión abierta con un token JWT.

## Funcionalidades

- **Registro** de usuarios con validaciones (email obligatorio, contraseña de al menos 6 caracteres, email no repetido).
- **Contraseñas cifradas** con `bcryptjs` (nunca se guardan en texto plano).
- **Login** que devuelve un token JWT válido por 24 horas.
- **Ruta protegida** `GET /user/me` que devuelve el usuario a partir del token.
- **Sesión persistente** en el cliente: al recargar la página se restaura la sesión.
- **Página Home** solo accesible con sesión iniciada y botón de cerrar sesión.

## Tecnologías

| Parte | Tecnologías |
|---|---|
| Servidor | Node.js, Express, Mongoose (MongoDB), JSON Web Token, bcryptjs, dotenv, cors |
| Cliente | React 18, React Router 7, Vite, Bootstrap |

## Estructura

```
.
├── client/                 # aplicación React (Vite)
│   └── src/
│       ├── api/            # llamadas a la API (registro, login, usuario actual)
│       ├── context/        # AuthContext: estado global de la sesión
│       ├── pages/          # RegisterForm, LoginForm, Home
│       └── router/         # rutas de la aplicación
└── server/                 # API REST (Express)
    ├── controllers/        # lógica de registro, login y usuario actual
    ├── middlewares/        # verificación del token
    ├── models/             # modelo User (Mongoose)
    ├── router/             # definición de rutas
    └── utils/              # creación y verificación de JWT
```

## Endpoints de la API

Base: `http://localhost:3977/api/v1`

| Método | Ruta | Descripción | Respuesta |
|---|---|---|---|
| `POST` | `/auth/register` | Registra un usuario (`firstname`, `lastname`, `email`, `password`) | `201` |
| `POST` | `/auth/login` | Inicia sesión (`email`, `password`) | `200` con `access_token` |
| `GET` | `/user/me` | Datos del usuario logueado (header `Authorization: Bearer <token>`) | `200` |

## Cómo ejecutarlo

Necesitás Node.js y una base de datos en [MongoDB Atlas](https://www.mongodb.com/atlas).

**1. Servidor**

```bash
cd server
npm install
cp .env.example .env     # completá tus datos de MongoDB y una clave JWT_SECRET
npm run dev
```

**2. Cliente**

```bash
cd client
npm install
npm run dev
```

Abrí la URL que muestra Vite (normalmente http://localhost:5173). Si tu API corre en otra dirección, creá `client/.env` con `VITE_API_URL=http://tu-servidor/api/v1`.

## Seguridad

- Las credenciales van en el archivo `.env`, que **no se sube** a GitHub (está en `.gitignore`). Usá `server/.env.example` como plantilla.
- Los mensajes de login no revelan si un email está registrado.

## Estado del proyecto

Proyecto de práctica terminado en su alcance actual. Ideas para seguir mejorándolo:

- [ ] Recuperar contraseña por email.
- [ ] Roles y rutas de administrador.
- [ ] Tests automáticos de la API.
- [ ] Desplegar el servidor y el cliente.
