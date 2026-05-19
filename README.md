# Portafolio Web · Juan David Pérez Sotelo

Sitio personal de un solo archivo (HTML + CSS + JS, sin build) listo para desplegar en **GitHub Pages**.

## Stack

- HTML semántico
- CSS moderno (variables, grid, animaciones, glassmorphism)
- JavaScript vanilla (IntersectionObserver, tilt 3D, typewriter, contador animado)
- Iconos de tecnologías desde [devicon](https://devicon.dev) vía CDN
- Tipografías: Space Grotesk, Inter, JetBrains Mono (Google Fonts)

## Estructura

```
portafolio-web/
├── index.html
├── styles.css
├── script.js
├── HojaDeVida_JuanDavidPerezSotelo.pdf   ← descarga del botón "Descargar CV"
└── README.md
```

## Ver localmente

Abre `index.html` en el navegador (doble clic), o sirve un mini-servidor para evitar issues de CORS con fuentes:

```bash
# Python 3
python -m http.server 5500
# Node
npx serve .
```

Luego abre `http://localhost:5500`.

## Deploy a GitHub Pages (sitio de usuario)

Para que quede en `https://juanda70perez.github.io`:

1. **Crear el repo en GitHub** con nombre exacto: `juanda70perez.github.io` (público).
2. **Inicializar y subir**:

   ```bash
   cd "C:/Users/juan-/portafolio-web"
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/juanda70perez/juanda70perez.github.io.git
   git push -u origin main
   ```

3. En el repo, ir a **Settings → Pages** y verificar:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `(root)`
   - Guardar.

4. Esperar 1–2 min. El sitio queda en `https://juanda70perez.github.io`.

## Deploy en un repo de proyecto (alternativa)

Si prefieres tenerlo en otro repo (ej. `portafolio-web`):

1. Crear repo `portafolio-web`, subir los archivos.
2. Settings → Pages → Source = `main` / `(root)`.
3. La URL quedará: `https://juanda70perez.github.io/portafolio-web/`.

## Personalización rápida

- **Cambiar frases del typewriter**: edita el array `phrases` en `script.js`.
- **Cambiar colores**: las variables CSS están al inicio de `styles.css` (`--accent`, `--accent-2`, etc.).
- **Agregar/quitar proyectos**: bloque `<section id="projects">` en `index.html`.
- **Actualizar PDF del CV**: reemplaza el archivo `HojaDeVida_JuanDavidPerezSotelo.pdf` con la versión nueva (mantén el nombre o ajusta el `href` en index.html).

## Próximos pasos opcionales

- Comprar un dominio (ej. `juandavidperez.dev`) y apuntarlo desde Settings → Pages → Custom domain.
- Agregar Google Analytics o Plausible para ver visitas.
- Sumar más proyectos personales fuera de "pruebas técnicas" — eso refuerza muchísimo el perfil.
