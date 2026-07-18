# Docencia

Registro completo de actividades académicas e instituciones.

<div x-data="dataLoader('data/Docencia.csv', 'nivel', 'Todos')">
    <div class="filters">
        <div class="filter-group">
            <input type="text" x-model="searchQuery" placeholder="Buscar curso, institución..." class="form-control" style="max-width: 300px; display: inline-block;">
            <select x-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                <template x-for="year in years">
                    <option :value="year" x-text="year === 'Todos' ? 'Todos los años' : year"></option>
                </template>
            </select>
        </div>
        <div class="filters__tags">
            <template x-for="cat in categories">
                <button 
                    @click="activeCategory = cat" 
                    :class="{'active': activeCategory === cat}"
                    class="filter-chip"
                    x-text="cat">
                </button>
            </template>
        </div>
    </div>
    <div x-show="loading" class="loading-state">
        <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargado programa académico...
    </div>
    <div x-show="!loading" class="layout-grid">
        <script type="text/template" class="blueprint">
            <div class="card card--accent-left">
                <div class="card__section card__section--top card__section--muted">
                    <div class="card-row card-row--between">
                        <span class="badge badge-gray">{{ tipo }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-calendar"></use></svg> {{ anio }}</span>
                    </div>
                </div>
                <div class="card__body card__body--stack">
                    <div class="blueprint-markdown">#### {{ curso }}</div>
                    <div class="blueprint-markdown">
                        {{ descripcion }}
                    </div>
                </div>
                <div class="card__section card__section--bottom card__section--muted">
                    <div class="card-row card-row--left">
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-map-pin"></use></svg> {{ institucion }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-graduation-cap"></use></svg> {{ programa }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-time-five"></use></svg> {{ horastotales }} horas</span>
                    </div>
                </div>
            </div>
        </script>
        <template x-for="item in items">
            <div x-html="render(item)"></div>
        </template>
        <div x-show="items.length === 0" class="no-results">
            No se encontraron cursos con los criterios seleccionados.
        </div>
    </div>
</div>
