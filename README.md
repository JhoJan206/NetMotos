# NetMotos

Plataforma web de información sobre motocicletas en Colombia: fichas técnicas, comparador de modelos, calculadora de consumo, guías y blog especializado.

## Sobre el proyecto

NetMotos es un sitio de contenido orientado al mercado colombiano de motocicletas. Permite consultar fichas técnicas detalladas por marca y modelo, comparar motos lado a lado, calcular el consumo de gasolina estimado y leer guías y artículos de blog sobre el sector. El objetivo principal de este proyecto fue **llevar a producción una aplicación real** para explorar en la práctica temas de **SEO** (estructura de URLs, sitemap, datos estructurados JSON-LD, metadatos Open Graph y Twitter), **Google AdSense** (espacios publicitarios integrados con consentimiento), **Google Search** (verificación del sitio, indexación y optimización de contenido) y **Google Analytics** (medición de tráfico y comportamiento de usuario mediante Google Tag Manager con gestión de consentimiento).

## Stack tecnológico

- Astro 5
- React 19
- TypeScript
- Fuse.js
- js-yaml
- astrojs/sitemap

## Estructura del proyecto

```
src/
├── components/   # Componentes Astro y React (Navbar, Footer, comparador, calculadora, etc.)
├── content/      # Fichas técnicas (motos) y artículos de blog
├── data/         # Datos auxiliares en JSON
├── layouts/      # Layouts base con SEO, Open Graph y Analytics
├── pages/        # Rutas del sitio (index, marcas, fichas, blog, guías, etc.)
├── styles/       # Estilos globales y de componentes
└── utils/        # Utilidades (búsqueda, formato de moneda)
```

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo
npm run build    # Generar sitio estático en dist/
npm run preview  # Previsualizar el build localmente
```

## Despliegue

El proyecto está configurado para desplegarse en Vercel. https://netmotos.lat