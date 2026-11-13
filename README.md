# 🍕 Pizzería Mamma Mía - Hito 7

Este hito se enfoca en el dominio avanzado de **React Router II**, incorporando enrutamiento dinámico para el detalle de productos y protección de rutas mediante la simulación de autenticación global con **Context API**.

## 🚀 Cambios e Implementaciones

### 1. Enrutamiento Dinámico (`useParams`)
- **`App.jsx`**: Se actualizó la ruta fija del producto a la ruta dinámica `/pizza/:id`.
- **`CardPizza.jsx`**: Se integró el componente `<Link>` en el botón *"Ver Más 👀"* para redirigir dinámicamente hacia `/pizza/${id}`.
- **`Pizza.jsx`**: Se implementó el hook `useParams()` para capturar el identificador de la URL y realizar peticiones dinámicas al endpoint `http://localhost:5000/api/pizzas/${id}`.

### 2. Contexto de Autenticación (`UserContext.jsx`)
- Se creó `src/context/UserContext.jsx` para gestionar de forma global el estado de sesión del usuario.
- Estado `token` inicializado en `true` por defecto y creación del método `logout()` para cambiar el estado a `false`.
- Envoltura global de la aplicación con `<UserProvider>` en el archivo `main.jsx`.

### 3. Protección de Rutas y Control de UI
- **`Navbar.jsx`**: Consumo de `token` y `logout`. Muestra los botones *Profile* y *Logout* cuando hay sesión activa, o *Login* y *Register* al cerrarla. Al hacer clic en *Logout*, se ejecuta el cierre de sesión global.
- **`Cart.jsx`**: Consumo de `token` para deshabilitar automáticamente el botón de *"Pagar 💳"* (`disabled={!token}`) si el usuario no está autenticado.
- **`App.jsx`**: Implementación del componente `<Navigate />` para proteger los accesos:
  - Si `token` es `false`, el acceso a `/profile` redirige automáticamente a `/login`.
  - Si `token` es `true`, los accesos a `/login` y `/register` redirigen hacia el inicio (`/`).

---

## 💻 Ejecución del Proyecto

1. Asegúrate de tener el servidor backend corriendo en el puerto `5000`.
2. En la carpeta del frontend, inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```
3. Prueba hacer clic en *"Ver Más 👀"* en cualquier tarjeta para ver su detalle único y utiliza el botón *"Logout"* para comprobar la protección de rutas en tiempo real.
