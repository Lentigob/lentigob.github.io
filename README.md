<!-- Hero Section -->
<div class="hero-section">
  <h1>LENTI</h1>
  <p>Laboratorio de Estudios sobre Nuevas Tecnologas e Innovación. Investigación interdisciplinaria para el futuro digital.</p>
  <a href="#/docs/proyectos" class="hero-btn">Explorar Proyectos</a>
</div>

<!-- Novedades -->
## Novedades y Destacados

<div class="vue-mount">
<csv-loader src="data/destacados.csv" category="Todos">
    <script type="text/template">
        <div class="news-container">
            <div v-show="loading" class="loading-state">
                <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg> Cargando novedades...
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

<!-- Logos de instituciones Participantes -->
## Instituciones Participantes

<div class="row align-center logos">
    <img src="assets\other\logo_INER.svg">
    <img src="assets\other\logo_CEIICH.svg">
    <img src="assets\other\logo_CIMAT.svg">
</div>

&nbsp;

<!-- Logos de fuentes de financiamiento -->
## Opoyo y Financiamiento

<div class="row align-center logos">
    <img src="assets\other\logo_SECIHTI.svg">
</div>

&nbsp;


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
