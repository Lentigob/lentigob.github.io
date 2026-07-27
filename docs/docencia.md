# Docencia

Registro completo de actividades académicas e instituciones.

<div class="vue-mount">
<csv-loader src="data/Docencia.csv" filter-col="nivel" category="Todos">
    <script type="text/template">
        <div class="filters">
            <div class="filter-group">
                <input type="text" v-model="searchQuery" placeholder="Buscar curso, institución..." class="form-control" style="max-width: 300px; display: inline-block;">
                <select v-model="selectedYear" class="form-control" style="max-width: 150px; display: inline-block;">
                    <option v-for="year in years" :value="year">{{ year === 'Todos' ? 'Todos los años' : year }}</option>
                </select>
            </div>
            <div class="filters__tags">
                <button v-for="cat in categories" @click="activeCategory = cat" :class="{'active': activeCategory === cat}" class="filter-chip">{{ cat }}</button>
            </div>
        </div>
        <div v-show="loading" class="loading-state">
            <svg class="icon-svg bx-spin"><use xlink:href="assets/icons/sprite.svg#bx-loader-alt"></use></svg> Cargado programa académico...
        </div>
        <div v-show="!loading" class="layout-grid">
            <div class="card card--accent-left" v-for="item in items" :key="item.curso">
                <div class="card__section card__section--top card__section--muted">
                    <div class="card-row card-row--between">
                        <span class="badge badge-gray">{{ item.tipo }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-calendar"></use></svg> {{ item.anio }}</span>
                    </div>
                </div>
                <div class="card__body card__body--stack">
                    <md-content>#### {{ item.curso }}</md-content>
                    <md-content>{{ item.descripcion }}</md-content>
                </div>
                <div class="card__section card__section--bottom card__section--muted">
                    <div class="card-row card-row--left">
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-map-pin"></use></svg> {{ item.institucion }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-graduation-cap"></use></svg> {{ item.programa }}</span>
                        <span class="card-inline"><svg class="icon-svg"><use xlink:href="assets/icons/sprite.svg#bx-time-five"></use></svg> {{ item.horastotales }} horas</span>
                    </div>
                </div>
            </div>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron cursos con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
