# Equipo de Trabajo

A continuación presentamos al equipo de investigadores y colaboradores de nuestro laboratorio.

## Investigadores Principales

<div x-data="dataLoader('data/Equipo.csv', 'Tipo', 'Investigador', { estado: 'activo' })">
    <script type="text/template" class="blueprint">
        <div class="card">
            <div class="team-image-container">
                <img src="assets/img/logo.png" class="image-placeholder">
                <img src="assets/img/equipo/{{ foto_auto }}.png" alt="{{ nombre }}" class="image-photo" onerror="this.style.display='none'">
            </div>
            <div class="card__body">
                <div class="blueprint-markdown align-right">
                    [<svg class="icon-svg small gray" title="LinkedIn"><use xlink:href="assets/icons/sprite.svg#bxl-linkedin"></use></svg>]({{ linkedin }})
                </div>
                <div class="blueprint-markdown">
                    ### {{ nombre }}
                    **{{ rol }}**  
                    *{{ institucion }}*
                    {{ departamento }}
                </div>
            </div>
        </div>
    </script>
    <div class="data-loader-container layout-grid">
        <div x-show="loading" class="loading-state">Cargando...</div>
        <template x-for="item in items">
            <div x-html="render(item)"></div>
        </template>
        <div x-show="!loading && items.length === 0" class="no-results">No se encontraron integrantes activos en esta categoría.</div>
    </div>
</div>

## Colaboradores y Estudiantes

<div x-data="dataLoader('data/Equipo.csv', 'Tipo', ['Colaborador', 'Estudiante', 'Asociado'], { estado: 'activo' })">
    <script type="text/template" class="blueprint">
        <div class="card">
            <div class="team-image-container">
                <img src="assets/img/logo.png" class="image-placeholder">
                <img src="assets/img/equipo/{{ foto_auto }}.png" alt="{{ nombre }}" class="image-photo" onerror="this.style.display='none'">
            </div>
            <div class="card__body">
                <div class="blueprint-markdown align-right">
                    [<svg class="icon-svg small gray" title="LinkedIn"><use xlink:href="assets/icons/sprite.svg#bxl-linkedin"></use></svg>]({{ linkedin }})
                </div>
                <div class="blueprint-markdown">
                    ### {{ nombre }}
                    **{{ rol }}**  
                    *{{ institucion }}*
                    {{ departamento }}
                </div>
            </div>
        </div>
    </script>
    <div class="layout-grid">
        <div x-show="loading" class="loading-state">Cargando...</div>
        <template x-for="item in items">
            <div x-html="render(item)"></div>
        </template>
        <div x-show="!loading && items.length === 0" class="no-results">No se encontraron integrantes.</div>
    </div>
</div>

## Integrantes Anteriores (Inactivos)

<div x-data="dataLoader('data/Equipo.csv', 'Estado', 'Inactivo')">
    <script type="text/template" class="blueprint">
        <div class="card card--inactive">
            <div class="card__body">
                <div class="blueprint-markdown align-right">
                    [<svg class="icon-svg small gray" title="LinkedIn"><use xlink:href="assets/icons/sprite.svg#bxl-linkedin"></use></svg>]({{ linkedin }})
                </div>
                <div class="blueprint-markdown">
                    ### {{ nombre }}
                    **{{ rol }}**  
                    *{{ institucion }}*
                    {{ departamento }}
                </div>
            </div>
        </div>
    </script>
    <div class="layout-grid">
        <div x-show="loading" class="loading-state">Cargando...</div>
        <template x-for="item in items">
            <div x-html="render(item)"></div>
        </template>
        <div x-show="!loading && items.length === 0" class="no-results">No hay registros inactivos.</div>
    </div>
</div>
