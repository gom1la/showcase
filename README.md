# Daniel Gomila — Portfolio

Un solo proyecto estático para Vercel. La galería contiene **20 sitios originales**: las 19 plantillas de servicios y Madison creadas anteriormente, sin recrear sus diseños.

## Vista local

Con Node.js 20 o posterior: `npm run dev`. Abrir http://127.0.0.1:4173. Generar con `npm run build`; verificar con `npm run check`.

## Desplegar en Vercel

Importar esta carpeta como un solo proyecto. Preset **Other**, comando `npm run build`, salida `dist` (ya configurado en `vercel.json`). No necesita paquetes ni variables de entorno. Cada sitio vive en `/webs/<slug>/`; se puede acceder directamente o recargar. La base de cada documento resuelve sus recursos incluso si Vercel normaliza la barra final.

## Archivos y ampliación

- `sites/`: copias de los sitios originales, incluidos estilos, scripts y recursos locales. Editar aquí para actualizar una plantilla. Los archivos de la tarea anterior permanecen intactos.
- `templates.mjs`: orden, nombre y carpeta de cada sitio. Agregar un registro y una carpeta en `sites/` para ampliar el catálogo.
- `integrate-sites.mjs`: copia los sitios a sus rutas internas, adapta la base e incorpora el enlace de regreso al portfolio. Genera previews con el header y hero originales.
- `gallery.js`: adapta la escala de las previews a sus tarjetas; las portadas se cargan progresivamente y no ejecutan los scripts completos de cada sitio.
- `build.mjs` y `styles.css`: portfolio principal.
- `dist/`: resultado listo para publicar. `dist/assets/` conserva fotografías de la primera versión, que ya no se utilizan en la galería.

Las previews usan las portadas originales; las páginas completas conservan sus interacciones. Las imágenes externas, fuentes y mapas siguen dependiendo de los proveedores usados en los diseños originales. Los videos locales y recursos de Madison están incluidos. Se preservan los datos y textos originales de los prototipos; revisarlos antes de usarlos para un cliente.

## Contacto

Email: danielwebs26@gmail.com. Phone: +54 9 11 3804-9630, enlace de llamada.

El formulario principal usa FormSubmit: https://formsubmit.co/. **Activación pendiente:** enviarlo una vez y confirmar el correo recibido en Gmail. Luego hacer un segundo envío para comprobar la recepción. No se han enviado mensajes de prueba ni verificado entrega al buzón desde esta tarea.
