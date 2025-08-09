# Página Web de Boda - María & Juan

Una hermosa página web de boda **completamente estática** con diseño mobile-first, creada con HTML5, CSS3 y JavaScript mínimo.

## 🌿 Características

### Diseño y Estilo
- **Mobile-first**: Diseño optimizado para dispositivos móviles
- **Colores naturales**: Paleta de colores blancos y verdes de naturaleza
- **Secciones de altura completa**: Cada sección ocupa el 100% de la altura de la pantalla
- **Tipografías elegantes**: Playfair Display para títulos y Montserrat para texto
- **Página estática**: Sin dependencias externas ni funcionalidades dinámicas complejas
- **Secciones de fotos**: Fotos de fondo con mensajes superpuestos

### Secciones Principales
1. **Inicio**: Hero section con nombres, fecha y ubicación
2. **Fotos 1**: Sección de fotos con mensaje "Nuestro Primer Encuentro"
3. **Nuestra Historia**: Timeline de la relación
4. **Fotos 2**: Sección de fotos con mensaje "Aventuras Juntos"
5. **Ceremonia**: Detalles del evento principal
6. **Fotos 3**: Sección de fotos con mensaje "El Amor Eterno"
7. **Recepción**: Información sobre la celebración
8. **RSVP**: Formulario de confirmación de asistencia

### Funcionalidades Estáticas
- ✅ Navegación suave entre secciones
- ✅ Menú hamburguesa para móviles
- ✅ Formulario RSVP básico (solo muestra mensaje)
- ✅ Efectos hover simples
- ✅ Diseño responsive completo
- ✅ Scroll suave
- ✅ Secciones de fotos con parallax
- ✅ Mensajes superpuestos en fotos
- ✅ Sin animaciones complejas ni efectos dinámicos

## 🎨 Paleta de Colores

```css
--color-white: #ffffff          /* Blanco principal */
--color-cream: #fafafa          /* Blanco crema */
--color-light-green: #e8f5e8    /* Verde claro */
--color-green: #4a7c59          /* Verde principal */
--color-dark-green: #2d5a3d     /* Verde oscuro */
--color-sage: #9caf88           /* Verde salvia */
--color-forest: #2c5530         /* Verde bosque */
```

## 📁 Estructura del Proyecto

```
invitation/
├── index.html          # Página principal (estática)
├── styles.css          # Estilos CSS (estático)
├── script.js           # JavaScript mínimo (estático)
├── package.json        # Configuración del proyecto
└── README.md           # Documentación
```

## 🚀 Cómo Usar

1. **Descarga** todos los archivos en una carpeta
2. **Abre** `index.html` en tu navegador
3. **¡Listo!** La página funciona completamente offline

### Personalización

#### Cambiar Información de la Boda
Edita el archivo `index.html`:

```html
<!-- Cambiar nombres -->
<h1 class="hero-title">María & Juan</h1>

<!-- Cambiar fecha -->
<div class="hero-date">
    <span class="date-day">15</span>
    <span class="date-month">Junio</span>
    <span class="date-year">2024</span>
</div>

<!-- Cambiar ubicación -->
<p class="hero-location">Jardín Botánico de la Ciudad</p>
```

#### Cambiar Fotos y Mensajes
Edita las secciones de fotos en `index.html`:

```html
<!-- Cambiar imagen de fondo -->
<div class="photo-background" style="background-image: url('tu-imagen.jpg');">
    <div class="photo-overlay"></div>
</div>

<!-- Cambiar título y mensaje -->
<div class="photo-content">
    <h2 class="photo-title">Tu Título</h2>
    <p class="photo-message">Tu mensaje personalizado aquí.</p>
</div>
```

#### Cambiar Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --color-green: #4a7c59;        /* Verde principal */
    --color-dark-green: #2d5a3d;   /* Verde oscuro */
    /* ... otros colores */
}
```

## 📱 Responsive Design

La página está optimizada para:
- 📱 **Móviles** (320px - 768px)
- 📟 **Tablets** (768px - 1024px)
- 💻 **Desktop** (1024px+)

### Breakpoints
```css
/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

## 🎯 Características Técnicas

### HTML5
- Semántica correcta
- Accesibilidad mejorada
- Meta tags optimizados
- **Sin dependencias externas**

### CSS3
- Variables CSS (custom properties)
- Flexbox y Grid
- Transiciones simples
- Media queries responsive
- **Secciones de fotos con parallax**
- **Sin animaciones complejas**

### JavaScript
- Vanilla JavaScript mínimo
- Solo funcionalidad básica de navegación
- **Sin librerías externas**
- **Sin efectos dinámicos complejos**

## 🌟 Características Estáticas

### Diseño
- **Fijo**: Contenido estático sin cambios dinámicos
- **Ligero**: Carga rápida sin dependencias
- **Simple**: Funcionalidad básica y confiable
- **Accesible**: Funciona en todos los navegadores

### Navegación
- Enlaces internos suaves
- Menú móvil funcional
- Scroll indicador
- **Secciones de fotos con parallax**

### Formulario
- Formulario RSVP básico
- Validación HTML5
- Mensaje de confirmación simple
- **Sin envío real de datos**

### Secciones de Fotos
- **Fotos de fondo**: Imágenes que ocupan toda la vista
- **Mensajes superpuestos**: Textos elegantes sobre las fotos
- **Efecto parallax**: Profundidad visual en desktop
- **Overlay verde**: Filtro de color para mejor legibilidad
- **Responsive**: Adaptación automática para móviles

## 📊 Ventajas de Página Estática

- ⚡ **Carga rápida**: Sin dependencias externas
- 🔒 **Segura**: Sin vulnerabilidades de servidor
- 💰 **Económica**: Hosting gratuito posible
- 🎯 **Confiable**: Funciona siempre
- 📱 **Compatible**: Todos los dispositivos
- 🔄 **Mantenimiento**: Fácil de actualizar

## 🔧 Personalización Avanzada

### Agregar Nueva Sección de Fotos
```html
<section id="fotos-4" class="section photo-section">
    <div class="photo-background" style="background-image: url('tu-imagen.jpg');">
        <div class="photo-overlay"></div>
    </div>
    <div class="photo-content">
        <h2 class="photo-title">Tu Título</h2>
        <p class="photo-message">Tu mensaje personalizado.</p>
    </div>
</section>
```

### Agregar Imágenes
```html
<div class="story-image">
    <img src="ruta/a/tu/imagen.jpg" alt="Descripción">
</div>
```

### Agregar Nueva Sección
```html
<section id="nueva-seccion" class="section">
    <div class="section-content">
        <h2 class="section-title">Nueva Sección</h2>
        <!-- Contenido -->
    </div>
</section>
```

### Modificar Estilos
Edita directamente en `styles.css`:

```css
.photo-content {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    /* Agregar tus estilos aquí */
}
```

## 🎨 Temas Adicionales

### Modo Oscuro
La página incluye soporte para modo oscuro automático:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --color-white: #1a1a1a;
        --color-cream: #2a2a2a;
        /* ... otros colores */
    }
}
```

## 📞 Soporte

Para preguntas o sugerencias:
- Revisa la documentación en este README
- Verifica la consola del navegador para errores
- Asegúrate de que todos los archivos estén en la misma carpeta

## 🎉 Créditos

Creado con ❤️ para celebrar el amor y la unión de María y Juan.

---

**¡Una página web de boda hermosa, simple y completamente estática con secciones de fotos!** 💑 