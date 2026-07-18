<!-- Hero Section -->
<div class="hero-section">
  <h1>LENTI</h1>
  <p>Laboratorio de Estudios sobre Nuevas Tecnologas e Innovación. Investigación interdisciplinaria para el futuro digital.</p>
  <a href="#/docsx/proyectos" class="hero-btn">Explorar Proyectos</a>
</div>

<!-- Novedades -->
## Novedades y Destacados 

<div x-data="dataLoader('data/destacados.csv')" class="news-container">
  <div x-show="loading" class="loading-state">
    <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando novedades...
  </div>
  
  <template x-for="item in items.slice(0, 5)" :key="item.titulo">
    <a :href="item.link" target="_blank" class="news-strip">
      <div class="news-meta">
        <span class="news-date" x-text="item.fecha"></span>
        <span class="news-title" x-text="item.titulo"></span>
      </div>
      <span class="news-tag" x-text="item.categoria"></span>
    </a>
  </template>
</div>

&nbsp;

<!-- Grid de Navegación -->
## Descubre nuestro trabajo

<div x-data="mdProcessor" class="layout-grid layout-grid--spaced">
  <a href="#/docs/proyectos" class="card card--interactive">
    <div class="card__body markdown-content centered-content">
      <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-folder"></use></svg>
      ### Proyectos
      Investigación aplicada y desarrollo tecnológico en curso.
    </div>
  </a>
  <a href="#/docs/publicaciones" class="card card--interactive">
    <div class="card__body markdown-content centered-content">
      <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-book"></use></svg>
      ### Publicaciones
      Artículos científicos, libros y capítulos técnicos.
    </div>
  </a>
  <a href="#/docs/software" class="card card--interactive">
    <div class="card__body markdown-content centered-content">
      <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-code-alt"></use></svg>
      ### Software
      Herramientas abiertas para la comunidad científica.
    </div>
  </a>
  <a href="#/docs/datos" class="card card--interactive">
    <div class="card__body markdown-content centered-content">
      <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-data"></use></svg>
      ### Datos
      Datasets y visualizaciones de libre acceso.
    </div>
  </a>
  <a href="#/docs/equipo" class="card card--interactive">
    <div class="card__body markdown-content centered-content">
      <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-group"></use></svg>
      ### Equipo
      Conoce a los investigadores y colaboradores del LENTI.
    </div>
  </a>
  <a href="#/docs/impacto" class="card card--interactive">
    <div class="card__body markdown-content centered-content">
      <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-trophy"></use></svg>
      ### Impacto
      Premios, menciones y resultados de transferencia.
    </div>
  </a>
</div>
