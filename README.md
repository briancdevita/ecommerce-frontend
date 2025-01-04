# 🛒 Frontend de Comercio Electrónico

Este es el frontend de una plataforma de comercio electrónico, construida usando **Next.js** y **Material-UI**. La plataforma permite a los usuarios navegar por productos, agregar artículos a su carrito, realizar pedidos y gestionar sus perfiles. Además, hay un **Panel de Administración** para gestionar usuarios, productos y pedidos.

---

## 🚀 Características

### Características del Usuario:
- **Autenticación:**
    - Inicio de sesión y registro con autenticación segura basada en tokens (JWT).
    - Sesiones persistentes usando Redux y `redux-persist`.

- **Gestión de Productos:**
    - Navegar por productos con vistas detalladas.
    - Agregar productos al carrito y gestionar los artículos del carrito.

- **Gestión de Pedidos:**
    - Ver y rastrear pedidos anteriores.
    - Realizar nuevos pedidos y recibir confirmación.

- **Gestión de Perfil:**
    - Ver información personal.
    - Acceder a pedidos anteriores y navegar sin problemas.

### Características del Administrador:
- **Panel de Administración:**
    - Gestionar productos: Agregar, editar o eliminar productos.
    - Gestionar usuarios: Ver, editar y eliminar usuarios.
    - Gestionar pedidos: Actualizar el estado del pedido y ver detalles del pedido.

### Diseño Responsivo:
- Totalmente responsivo y optimizado para dispositivos móviles, tabletas y de escritorio.

---

## 🛠️ Tecnologías Utilizadas

### Frontend:
- **Next.js**: Para renderizado del lado del servidor y enrutamiento.
- **TypeScript**: Garantiza la seguridad de tipos en toda la aplicación.
- **Redux Toolkit**: Gestiona el estado global, incluida la autenticación y la funcionalidad del carrito.
- **Redux Persist**: Proporciona estado persistente para el carrito y las sesiones de usuario.
- **Material-UI**: Utilizado para componentes de UI y temas.
- **Axios**: Maneja las solicitudes API al backend.

### Herramientas:
- **React-Toastify**: Proporciona notificaciones de éxito y error.
- **Redux DevTools**: Depura y monitorea el estado de la aplicación.

---

## 📂 Estructura del Proyecto

```bash
ecommerce-frontend/
├── components/       # Componentes reutilizables de React (Navbar, Footer, etc.)
├── context/          # Contexto heredado para el carrito (migrado a Redux)
├── pages/            # Componentes de página de Next.js
├── public/           # Archivos estáticos (imágenes, íconos)
├── redux/            # Slices y thunks de Redux
│   ├── slices/       # Slices de estado (auth, cart)
│   ├── store.ts      # Configuración de la tienda Redux
│   └── thunks/       # Thunks asíncronos (acciones de carrito, auth)
├── styles/           # Estilos globales y específicos de componentes
├── types/            # Definiciones de tipos de TypeScript
├── utils/            # Funciones utilitarias (instancia de axios, helpers)
└── README.md         # Documentación
```

---

## 🔧 Configuración e Instalación

### Requisitos Previos:
1. **Node.js**: Asegúrate de tener Node.js (v16 o superior) instalado.
2. **NPM o Yarn**: Usa npm o yarn para la gestión de paquetes.

### Pasos:

1. **Clonar el repositorio**:
     ```bash
     git clone https://github.com/your-repo/ecommerce-frontend.git
     cd ecommerce-frontend
     ```

2. **Instalar dependencias**:
     ```bash
     npm install
     # o
     yarn install
     ```

3. **Variables de entorno**:
     Crea un archivo `.env.local` en el directorio raíz y configura las siguientes variables:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8080  # URL de la API del backend
     ```

4. **Ejecutar el servidor de desarrollo**:
     ```bash
     npm run dev
     # o
     yarn dev
     ```

5. **Abrir la aplicación**:
     Visita [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🛡️ Flujo de Autenticación

1. **Inicio de Sesión**: Los usuarios autenticados reciben un JWT del backend, almacenado en `redux-persist`.
2. **Persistencia de Sesión**: El estado se sincroniza con localStorage, permitiendo la persistencia de la sesión a través de las actualizaciones.
3. **Acceso de Administrador**: Los usuarios administradores son validados usando sus roles antes de acceder a rutas restringidas.

---

## 📚 Scripts Disponibles

- **Desarrollo**:
    ```bash
    npm run dev
    ```
- **Construcción**:
    ```bash
    npm run build
    ```
- **Linter**:
    ```bash
    npm run lint
    ```

---

## 🚀 Mejoras Futuras

- Agregar pruebas unitarias usando **Jest** y **React Testing Library**.
- Implementar funcionalidad de búsqueda y filtrado para productos.
- Mejorar el manejo de errores y la validación de formularios.

---

## 💡 Directrices de Contribución

1. Haz un fork del repositorio y crea una nueva rama.
2. Realiza tus cambios y pruébalos localmente.
3. Envía un pull request con una descripción clara de los cambios.

---

## 🔗 Repositorios Relacionados

- [Backend de Comercio Electrónico](https://github.com/your-repo/ecommerce-backend) - El repositorio del backend para este proyecto.

---

## ✨ Agradecimientos

¡Gracias a la comunidad de código abierto por las herramientas y bibliotecas utilizadas en este proyecto!

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.