# Dulcería y Sorbetería Colón 🍧

Sitio web de la **Dulcería y Sorbetería Colón** — Mérida, Yucatán. Sorbetes artesanales de fruta natural desde **1907**. Más de 100 años de tradición.

Landing page moderna con sensación hogareña y nostálgica: historia, carta de sabores, la champola, celebridades, reseñas reales de Google y contacto con botón de WhatsApp.

## Stack
- HTML / CSS / JavaScript vanilla (sin dependencias, sin build)
- Deploy en **Vercel** (auto-deploy en cada push)

## Estructura
- `index.html` — página completa (una sola página)
- `styles.css` — estilos y diseño
- `script.js` — reseñas, navegación móvil, botón compartir, animaciones

## Cómo editar
- **Número de WhatsApp:** cambia la constante `WA` al inicio de `script.js` (formato: 52 + 1 + 10 dígitos). También reemplaza `5219999999999` en `index.html`.
- **La Carta (productos):** edita el arreglo `MENU` en `script.js`. Cada item tiene `img`, `name`, `price`, `desc`. Pon la foto del producto en `/images` y usa su nombre en `img`. Al tocar una tarjeta se abre un popup con la foto grande.
- **Celebridades:** edita el arreglo `CELEBS` en `script.js`. Agrega `{ img, name, note }` con la foto en `/images`. Los recuadros "Agrega aquí la foto" son marcadores `{ __add:true }` — bórralos al llenar el carrusel.
- **Reseñas:** edita el arreglo `REVIEWS` en `script.js` (carrusel en la sección Visítanos).

## Fotos
Todas las imágenes reales están en `/images` (fachada histórica de 1907, fotos vintage del fundador e interior, y fotografía de producto). Reemplázalas por fotos propias cuando quieras — conserva los mismos nombres de archivo o actualiza las rutas.

## Desarrollo local
Abre `index.html` en el navegador, o:
```bash
npx serve .
```

---
Desde 1907 · Mérida, Yucatán.
