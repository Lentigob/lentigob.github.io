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
            <icon-svg name="bx-loader-alt" class="bx-spin"></icon-svg> Cargado programa académico...
        </div>
        <div v-show="!loading" class="layout-grid">
            <card-block v-for="item in items" :key="item.curso">
                <div class="card-content">
                    <md-content>
                        #### {{ item.url ? ('<a href="' + item.url + '" target="_blank">' + item.curso + '</a>') : item.curso }} <br>
                        {{ item.descripcion }}
                    </md-content>
                    <ul class="icon-bullets">
                        <li><icon-svg name="bx-map-pin"></icon-svg><span>{{ item.institucion }}</span></li>
                        <li><icon-svg name="bx-graduation-cap"></icon-svg><span>{{ item.programa }}</span></li>
                    </ul>
                    <div class="row align-right" v-if="item.url">
                        <a :href="item.url" target="_blank" class="data-action">
                            <icon-svg name="bx-link-external"></icon-svg>
                            Ver curso
                        </a>
                    </div>
                </div>
                <template #bottom>
                    <div class="row space-between">
                        <span class="badge badge-gray">{{ item.tipo }}</span>
                        <div class="row row-xs align-center">
                            <span v-if="Number.isFinite(Number(item.horastotales))" class="card-inline"><icon-svg name="bx-time-five"></icon-svg> {{ item.horastotales }} horas </span>
                            <span class="card-inline"><icon-svg name="bx-calendar"></icon-svg> {{ item.anio }}</span>
                        </div>
                    </div>
                </template>
            </card-block>
            <div v-show="items.length === 0" class="no-results">
                No se encontraron cursos con los criterios seleccionados.
            </div>
        </div>
    </script>
</csv-loader>
</div>
