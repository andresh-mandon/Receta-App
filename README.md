RecetApps

RecetApps es una aplicación web desarrollada en React que permite explorar recetas de comida mediante categorías, buscar por nombre o letra inicial, ver detalles completos de cada receta (ingredientes, instrucciones, video), y guardar recetas favoritas utilizando almacenamiento en el navegador. El proyecto busca reforzar buenas prácticas de desarrollo web moderno, como la separación de componentes, gestión de estado global, uso de rutas dinámicas y estilos responsivos.

1. Tecnologías y librerías utilizadas

Frontend
React 19.1.0: Biblioteca principal para construir la interfaz de usuario basada en componentes.
React DOM 19.1.0: Para renderizar los componentes React en el navegador.
React Router DOM 6.30.1: Para la navegación entre rutas como Home, Favoritos y Detalles de recetas.
React Icons 5.5.0: Librería de íconos SVG que incluye colecciones populares (FontAwesome, Material, Game Icons, entre otros).
Vite 6.3.5: Herramienta de desarrollo moderna para compilar y servir la aplicación con recarga rápida.

Herramientas de desarrollo
ESLint 9.29.0: Herramienta de análisis de código estático para identificar errores y mantener la calidad del código.
eslint-plugin-react-hooks / react-refresh / globals: Extensiones de ESLint para soportar React y el entorno del navegador.
@vitejs/plugin-react 4.5.2: Plugin necesario para permitir el uso de JSX y Fast Refresh con Vite.
@types/react & @types/react-dom: Tipos para autocompletado y validación en editores como VSCode (aunque no se usa TypeScript directamente en el proyecto).

2. Estructura del proyecto

src/
│
├── components/ # Componentes reutilizables como Navbar, filtros, etc.
├── context/ # Contexto global para manejar favoritos
├── pages/ # Páginas principales (Home, RecipeDetail, Favorites)
├── services/ # Funciones para consumir la API
├── styles/ # Archivos CSS por módulo
├── App.jsx # Componente principal que define las rutas
├── icon.jsx # Iconos SVG profesionales
└── main.jsx # Punto de entrada de la aplicación

3. Configuración del entorno

Requisitos previos
Tener instalado Node.js (versión recomendada: 18.x o superior)
Tener instalado npm (v9 o superior, suele venir con Node.js)
Un editor de código (utilizado: VSCode)

Clonar el repositorio

git clone https://github.com/tu-usuario/recetapps.git
cd recetapps

Instalar dependencias

npm install
Esto instalará React, Vite, React Router DOM, React Icons y todas las librerías necesarias.

4. Ejecutar la aplicación en modo desarrollo
   Para iniciar el servidor de desarrollo local, ejecuta:

npm run dev
Luego abre tu navegador y visita la siguiente dirección:
http://localhost:5173

La aplicación se recargará automáticamente cuando realices cambios en los archivos fuente.

5 Notas adicionales
Las recetas se obtienen mediante peticiones a una API pública.
Los favoritos se almacenan localmente en el navegador usando localStorage.
El diseño es completamente responsivo, adaptado a dispositivos móviles y de escritorio.
La aplicación usa CSS modularizado por componente para mantener orden y escalabilidad.
