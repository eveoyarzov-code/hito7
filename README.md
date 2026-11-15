# 🍕 Pizzería Mamma Mía - Hito 8 (Final)

Este hito finaliza el desarrollo de la aplicación web implementando **autenticación real mediante JSON Web Tokens (JWT)** contra el backend, conectando el inicio de sesión, registro, obtención del perfil de usuario y envío de órdenes de compra.

## 🚀 Cambios e Implementaciones

### 1. Autenticación Real con JWT (`UserContext.jsx`)
- Se reemplazó el estado simulado por la gestión real del `token` JWT y el `email` del usuario autenticado.
- **`login(email, password)`**: Consume `POST /api/auth/login`, almacena el token y el correo en el estado global.
- **`register(email, password)`**: Consume `POST /api/auth/register` para registrar nuevos usuarios e iniciar sesión automáticamente.
- **`logout()`**: Limpia los estados de `token` y `email` (`null`), cerrando la sesión en toda la aplicación.
- **`getProfile()`**: Consume `GET /api/auth/me` enviando el token en el header `Authorization: Bearer <token>` para validar y obtener los datos del usuario.

### 2. Formularios y Perfil Conectados
- **`LoginPage.jsx` y `RegisterPage.jsx`**: Conectados directamente a los métodos globales de `UserContext` para autenticar usuarios contra el servidor.
- **`Profile.jsx`**: Ejecuta `getProfile()` al montarse, despliega dinámicamente el correo del usuario autenticado y permite cerrar sesión mediante su botón dedicado.
- **`Navbar.jsx`**: Enlaza su botón *Logout* con la función global de cierre de sesión.

### 3. Proceso de Pago / Checkout (`Cart.jsx`)
- Implementación de `handleCheckout()`, que envía el contenido del carrito al endpoint `POST /api/checkouts` adjuntando el token JWT en las cabeceras (`Authorization`).
- Despliegue de una alerta visual de confirmación en pantalla tras completarse exitosamente la transacción.

---

## 💻 Ejecución del Proyecto Completo

1. **Levantar el Backend:**
   En la carpeta del servidor, inicia la API en el puerto `5000`:
   ```bash
   npm run dev
   ```

2. **Iniciar el Frontend:**
   En la raíz de este proyecto, ejecuta:
   ```bash
   npm install
   npm run dev
   ```

3. **Credenciales de prueba:**
   Puedes registrar un usuario nuevo en `/register` o iniciar sesión en `/login` con:
   - **Email:** `test@example.com`
   - **Contraseña:** `123123`
