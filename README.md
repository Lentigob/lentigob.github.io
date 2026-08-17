<!-- Hero Section -->
<a href="#/docs/proyectos" class="hero-section">
  <div class="hero-photo">
    <img src="assets/media/IMG_1313.JPG" alt="" class="hero-bg-image">
    <div class="hero-content">
      <h1>LENTI</h1>
      <p>Laboratorio de Estudios sobre Nuevas Tecnologas e Innovación. Investigación interdisciplinaria para el futuro digital.</p>
    </div>
  </div>
  <div class="hero-cta">Explorar Proyectos</div>
</a>

<!-- Novedades -->
## Novedades y Destacados

<div class="vue-mount">
<csv-loader src="data/destacados.csv" category="Todos">
    <script type="text/template">
        <div>
            <div v-show="loading" class="loading-state">
                <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg> Cargando novedades...
            </div>
            <a v-for="item in items.slice(0, 5)" :key="item.titulo" :href="$deepLink(item)" class="card interactive news-strip">
                <img v-if="item.imagen" :src="item.imagen" :alt="item.titulo" class="data-table__thumbnail" @error="$event.target.style.display='none'">
                <div v-else class="data-table__thumbnail data-table__thumbnail--placeholder" title="Sin imagen">
                    <icon-svg name="bx-briefcase-alt"></icon-svg>
                </div>
                <div class="card__body">
                    <div class="row space-between">
                        <md-content>
                            {{ item.fecha }}
                            #### {{ item.titulo }}
                        </md-content>
                        <span class="badge badge-default">{{ item.categoria }}</span>
                    </div>
                </div>
            </a>
        </div>
    </script>
</csv-loader>
</div>

&nbsp;

<!-- Logos de instituciones Participantes -->
## Instituciones Participantes

<div class="row align-center logos">
    <img src="assets\other\logo_INER.svg" class="logo__INER">
    <img src="assets\other\logo_CEIICH.svg" class="logo__CEIICH">
    <img src="assets\other\logo_CIMAT.svg" class="logo__CIMAT">
</div>

<!-- Logos de fuentes de financiamiento -->
## Apoyo y Financiamiento

<div class="row align-center logos">
    <img src="assets\other\logo_SECIHTI.svg" class="logo__SECIHTI">
</div>

<!-- Grid de Navegación -->
## Descubre nuestro trabajo

<div class="vue-mount">
<vue-mount>
    <script type="text/template">
        <div class="layout-grid">
            <a href="#/docs/eventos" class="card interactive">
                <div class="card__body centered-content">
                    <icon-svg name="bx-folder" class="large"></icon-svg>
                    <md-content>
                        ### Eventos
                        Actividades y encuentros de divulgación.
                    </md-content>
                </div>
            </a>
            <a href="#/docs/resultados" class="card interactive">
                <div class="card__body centered-content">
                    <icon-svg name="bx-book" class="large"></icon-svg>
                    <md-content>
                        ### Resultados
                        Reportes, publicaciones, datos abiertos y software desarrollado.
                    </md-content>
                </div>
            </a>
            <a href="#/docs/equipo" class="card interactive">
                <div class="card__body centered-content">
                    <icon-svg name="bx-group" class="large"></icon-svg>
                    <md-content>
                        ### Equipo
                        Conoce a los investigadores y colaboradores del LENTI.
                    </md-content>
                </div>
            </a>
            <a href="#/docs/impacto" class="card interactive">
                <div class="card__body centered-content">
                    <icon-svg name="bx-trophy" class="large"></icon-svg>
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
