// Detecta si el sitio corre en un entorno de desarrollo local (sin build step,
// no hay .env real que un bundler pueda leer). GitHub Pages sirve desde un
// dominio *.github.io o un dominio propio, nunca localhost/127.0.0.1/archivo
// local, así que basta con inspeccionar el host en tiempo de ejecución.
window.__DEV__ = ['localhost', '127.0.0.1', ''].includes(location.hostname);
