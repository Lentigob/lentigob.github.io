<!-- Hero Section -->
<div class="hero-section">
  <h1>LENTI</h1>
  <p>Laboratorio de Estudios sobre Nuevas Tecnologas e Innovación. Investigación interdisciplinaria para el futuro digital.</p>
  <a href="#/docsx/proyectos" class="hero-btn">Explorar Proyectos</a>
</div>

<!-- Novedades -->
## Novedades y Destacados

<div class="vue-mount">
<csv-loader src="data/destacados.csv" category="Todos">
    <script type="text/template">
        <div class="news-container">
            <div v-show="loading" class="loading-state">
                <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargando novedades...
            </div>
            <a v-for="item in items.slice(0, 5)" :key="item.titulo" :href="item.url" target="_blank" class="news-strip">
                <div class="news-meta">
                    <span class="news-date">{{ item.fecha }}</span>
                    <span class="news-title">{{ item.titulo }}</span>
                </div>
                <span class="news-tag">{{ item.categoria }}</span>
            </a>
        </div>
    </script>
</csv-loader>
</div>

&nbsp;

<!-- Grid de Navegación -->
## Descubre nuestro trabajo

<div class="vue-mount">
<vue-mount>
    <script type="text/template">
        <div class="layout-grid layout-grid--spaced">
            <a href="#/docs/proyectos" class="card card--interactive">
                <div class="card__body centered-content">
                    <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-folder"></use></svg>
                    <md-content>
                        ### Proyectos
                        Investigación aplicada y desarrollo tecnológico en curso.
                    </md-content>
                </div>
            </a>
            <a href="#/docs/resultados" class="card card--interactive">
                <div class="card__body centered-content">
                    <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-book"></use></svg>
                    <md-content>
                        ### Resultados
                        Reportes, publicaciones, datos abiertos y software desarrollado.
                    </md-content>
                </div>
            </a>
            <a href="#/docs/equipo" class="card card--interactive">
                <div class="card__body centered-content">
                    <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-group"></use></svg>
                    <md-content>
                        ### Equipo
                        Conoce a los investigadores y colaboradores del LENTI.
                    </md-content>
                </div>
            </a>
            <a href="#/docs/impacto" class="card card--interactive">
                <div class="card__body centered-content">
                    <svg class="icon-svg large"><use xlink:href="assets/icons/sprite.svg#bx-trophy"></use></svg>
                    <md-content>
                        ### Impacto
                        Premios, menciones y resultados de transferencia.
                    </md-content>
                </div>
            </a>
        </div>
    </script>
</vue-mount>
</div>
