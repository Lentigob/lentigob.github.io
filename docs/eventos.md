# Eventos

Congresos, talleres y seminarios donde participamos.

<div x-data="dataLoader('data/Eventos.csv', 'tipo', 'Todos')">
    <div class="filters">
        <div class="filter-group">
            <input type="text" x-model="searchQuery" placeholder="Buscar evento, ponente o tema..." class="form-control" style="max-width: 300px; display: inline-block;">
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
        <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargardo agenda de eventos...
    </div>
    <div x-show="!loading" class="layout-grid">
        <script type="text/template" class="blueprint">
            <div class="card card--interactive card--accent-left">
                <div class="card__section card__section--top card__section--muted">
                    <div class="card-row card-row--between">
                        <span class="badge badge-blue">{{ tipo }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-calendar"></use></svg> {{ fechainicio }} - {{ fechafin }}</span>
                    </div>
                </div>
                <div class="card__body card__body--stack">
                    <div class="blueprint-markdown">#### {{ nombreevento }}</div>
                    <div class="blueprint-markdown">
                        *{{ titulo }}*
                    </div>
                </div>
                <div class="card__section card__section--bottom card__section--muted">
                    <div class="card-row card-row--left">
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-user"></use></svg> {{ autores }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-map-pin"></use></svg> {{ institucionsede }} ({{ alcance }})</span>
                    </div>
                    <div class="card-row card-row--between">
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-briefcase"></use></svg> {{ organizador }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-flag"></use></svg> {{ etapa }}</span>
                    </div>
                </div>
            </div>
        </script>
        <template x-for="ev in items">
            <div x-html="render(ev)"></div>
        </template>
        <div x-show="items.length === 0" class="no-results">
            No se encontraron eventos con los criterios seleccionados.
        </div>
    </div>
</div>

