# Hacker News Clone - React

Este proyecto es una implementación de un clon (simplificado) de **Hacker News**, desarrollado siguiendo los requisitos del **proyecto curricular** del curso de **React** de [ui.dev](https://ui.dev/react).

## Descripción

La aplicación consume la **Hacker News API** para mostrar publicaciones, comentarios y detalles de cada noticia.  
El objetivo principal fue poner en práctica conceptos clave de React como:

- Componentes funcionales
- **React Hooks** (`useState`, `useEffect`)
- **Context API** para gestión de estado global (modo claro/oscuro)
- React Router para navegación
- **React Suspense** para manejo de carga asincrónica
- Renderizado condicional
- Llamadas a API y manejo de datos asincrónicos

## Demo

- **Deploy en producción**: [Enlace a Netlify](https://hackernews-clone-hooks.netlify.app/)  
- **Repositorio**: [GitHub](https://github.com/Popooov/hackernews-clone)

## Tecnologías usadas

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- **Context API** (estado global)
- Fetch API
- HTML5 + CSS3

## Funcionalidades

- Ver la lista de publicaciones más recientes y más votadas
- Consultar detalles de cada publicación
- Mostrar comentarios anidados
- **Cambiar entre modo claro y modo oscuro** usando Context API
- Navegación entre vistas con React Router
- **Renderizado optimizado con React Suspense** para mostrar contenido asincrónico

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Popooov/hackernews-clone.git
   
2. Instala dependencias:
   ```bash
   npm install

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm start

4. Abre en tu navegador:
   ```bash
   http://localhost:3000
